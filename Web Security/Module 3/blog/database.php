<?php
class Database {
    private static ?Database $instance = null;
    private static ?PDO $connection = null;

    private function __construct() {
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

    public static function getInstance(): Database {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }


    public static function getConnection(): PDO {
        if (self::$connection === null) {
            self::getInstance();
        }
        return self::$connection;
    }

    private static function formatDatetime($datetime): string {
        return date("Y-m-d H:i:s", strtotime($datetime));
    }

    public static function createUser($username, $password): bool {
        $pdo = self::getConnection();

        //check if username already exists
        if (self::existUser($username)) {
            return false;
        }

        $salt = uniqid();
        $salted_password = $salt . $password;
        $encrypted_password = hash("sha512", $salted_password);

        $sql = "INSERT INTO members (username, password, salt) VALUES (?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$username, $encrypted_password, $salt]);
    }

    public static function findBlogs($limit = null): array {
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

    public static function createPost($title, $content): bool {
        $pdo = self::getConnection();
        $sql = "INSERT INTO posts (title, content, created_at) VALUES (?, ?, NOW())";
        $stmt = $pdo->prepare($sql);
        return $stmt->execute([$title, $content]);
    }

    private static function existUser($username): bool {
        $pdo = self::getConnection();
        $sql = "SELECT COUNT(*) AS count_num FROM members WHERE username = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username]);
        $result = $stmt->fetch();

        return ($result && $result['count_num'] > 0);
    }

    public static function checkLogin($username, $password): bool {
        if (!isset($username) || !isset($password)) {
            return false;
        }

        if (strlen($username) > 255 || strlen($username) <= 0 || strlen($password) > 255 || strlen($password) <= 0) {
            return false;
        }

        $pdo = self::getConnection();
        $sql = "SELECT password, salt FROM members WHERE username = ? LIMIT 1";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$username]);
        $user = $stmt->fetch();

        if (!$user) {
            return false;
        }

        $salted_password = $user['salt'] . $password;
        $check_password = hash("sha512", $salted_password);

        return $check_password === $user['password'];
    }

    public static function findPostById($post_id): bool|array {
        $pdo = self::getConnection();
        $post_id = filter_var($post_id, FILTER_VALIDATE_INT);
        if (!$post_id) return false;

        $sql = "SELECT * FROM posts WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$post_id]);
        $post = $stmt->fetch();

        return $post ?: false;
    }
}