<?php
class Database
{
    private static ?Database $instance = null;
    private static ?PDO $connection = null;

    private const TOTAL_FAILED_LOGIN = 3;
    private const LOCKOUT_TIME = 2;

    private function __construct()
    {
        $dsn = "mysql:host=" . DB_HOSTNAME . ";dbname=" . DB_DATABASE . ";charset=utf8mb4";

        try {
            self::$connection = new PDO($dsn, DB_USER, DB_PASSWORD, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false
            ]);
        } catch (PDOException $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }

    public static function getInstance(): Database
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }


    public static function getConnection(): PDO
    {
        if (self::$connection === null) {
            self::getInstance();
        }
        return self::$connection;
    }

    private static function formatDatetime($datetime): string
    {
        return date("Y-m-d H:i:s", strtotime($datetime));
    }

    public static function createUser($username, $email, $password): array|bool
    {
        $errors = array();
        $pdo = self::getConnection();
        //check if username already exists
        $user = self::existUser($username, $email);
        if ($user) { // if user exists, which field?
            if ($user['username'] == $username) {
                array_push($errors, "Username already exists!");
            }
            if ($user['email'] == $email) {
                array_push($errors, "Email already exists!");
            }
            return $errors;
        }

        $salt = uniqid();
        $salted_password = $salt . $password;
        $encrypted_password = hash("sha512", $salted_password);

        $sql = "INSERT INTO members (username, email, password, salt) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$username, $email, $encrypted_password, $salt]);
    }

    public static function findBlogs($limit = null): array
    {
        $pdo = self::getConnection();
        $blogs = [];

        $sql = "SELECT * FROM posts ORDER BY created_at DESC";
        if ($limit !== null) {
            $sql .= " LIMIT :limit";
        }

        $stmt = $pdo->prepare($sql);

        if ($limit !== null) {
            $stmt->bindValue(':limit', (int)$limit, PDO::PARAM_INT);
        }

        $stmt->execute();
        $rows = $stmt->fetchAll();

        foreach ($rows as $row) {
            $row['created_at'] = self::formatDatetime($row['created_at']);
            $blogs[] = $row;
        }

        return $blogs;
    }

    public static function createPost($title, $content): bool
    {
        $pdo = self::getConnection();
        $sql = "INSERT INTO posts (title, content, created_at) VALUES (?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$title, $content]);
    }

    private static function existUser($username, $email): mixed
    {
        $pdo = self::getConnection();
        $sql = "SELECT username, email FROM members WHERE username = ? or email = ? LIMIT 1";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username, $email]);
        $result = $stmt->fetch();
        return $result;
    }

    private static function checkLocked($username): array
    {
        $pdo = self::getConnection();
        $sql = "SELECT failed_login, last_login FROM members WHERE username = ? LIMIT 1 FOR UPDATE";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        $message = [];
        $account_locked = false;
        // Check to see if the user has been locked out.
        if ($user && $user['failed_login'] >= self::TOTAL_FAILED_LOGIN) {
            $last_login = strtotime($user['last_login']);
            $timeout = $last_login + (self::LOCKOUT_TIME * 60);
            $timenow = time();
            $message = [
                "The account is locked for time",
                "The last login was: " . date("h:i:s", $last_login),
                "The timenow is: " . date("h:i:s", $timenow),
                "The timeout is: " . date("h:i:s", $timeout),
            ];
            if ($timenow < $timeout) {
                $account_locked = true;
            }
        }
        return ['account_locked' => $account_locked, 'message' => $message];
    }

    public static function checkLogin($username, $password): array
    {
        $user_id = -1;
        $login_success = false;
        $message = [];

        if (!isset($username) || !isset($password)) {
            return ['login_success' => $login_success, 'user_id' => $user_id, 'message' => $message];
        }

        if (strlen($username) > 255 || strlen($username) <= 0 || strlen($password) > 255 || strlen($password) <= 0) {
            return ['login_success' => $login_success, 'user_id' => $user_id, 'message' => $message];
        }

        $pdo = self::getConnection();

        try {
            $pdo->beginTransaction();
            $sql = "SELECT id, password, salt, failed_login, last_login 
                FROM members 
                WHERE username = ? 
                LIMIT 1 
                FOR UPDATE";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([$username]);
            $user = $stmt->fetch();

            if ($user) {
                $user_id = $user['id'];
                $last_login_time = strtotime($user['last_login']);
                $timenow = time();
                $timeout = $last_login_time + (self::LOCKOUT_TIME * 60);

                if ($user['failed_login'] >= self::TOTAL_FAILED_LOGIN && $timenow < $timeout) {
                    $message = [
                        "The account is locked for time",
                        "The last login was: " . date("H:i:s", $last_login_time),
                        "The timenow is: " . date("H:i:s", $timenow),
                        "The timeout is: " . date("H:i:s", $timeout),
                    ];
                } else {
                    $salted_password = $user['salt'] . $password;
                    $check_password = hash("sha512", $salted_password);

                    if ($check_password === $user['password']) {
                        $login_success = true;
                        self::resetFailedLogin($username);
                    } else {
                        self::countFailedLogin($username);
                        $stmt = $pdo->prepare("SELECT failed_login FROM members WHERE username = ? LIMIT 1");
                        $stmt->execute([$username]);
                        $failed_count = (int)$stmt->fetchColumn();

                        if ($failed_count > self::TOTAL_FAILED_LOGIN) {
                            $message = [
                                "The account is locked for time",
                                "The last login was: " . date("H:i:s", $last_login_time),
                                "The timenow is: " . date("H:i:s", $timenow),
                                "The timeout is: " . date("H:i:s", $timeout),
                            ];
                        }
                    }
                    self::updateLastLogin($username);
                }
            }

            $pdo->commit();
        } catch (PDOException $e) {
            $pdo->rollBack();
            throw $e;
        }

        return [
            'login_success' => $login_success,
            'user_id' => $user_id,
            'message' => $message
        ];
    }


    private static function updateLastLogin($username)
    {
        $pdo = self::getConnection();
        $sql = "UPDATE members SET last_login = NOW() WHERE username = ? LIMIT 1";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username]);
    }
    private static function countFailedLogin($username)
    {
        $pdo = self::getConnection();
        $sql = "UPDATE members SET failed_login = failed_login + 1 WHERE username = ? LIMIT 1";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username]);
    }

    private static function resetFailedLogin($username)
    {
        $pdo = self::getConnection();
        $sql = "UPDATE members SET failed_login = 0 WHERE username = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username]);
    }
    public static function findPostById($post_id): bool|array
    {
        $pdo = self::getConnection();
        $post_id = filter_var($post_id, FILTER_VALIDATE_INT);
        if (!$post_id) {
            return false;
        }

        $sql = "SELECT * FROM posts WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$post_id]);
        $post = $stmt->fetch();

        return $post ?: false;
    }
}
