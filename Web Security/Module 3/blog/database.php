<?php

class Database {
    //private mysqli $mysqli;
    private static ?Database $instance = null;
    private static ?mysqli $connection = null;

    /**
     * @throws Exception
     */
    private function __construct() {
        // Enable mysqli report mode
        mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

        try {
            self::$connection = new mysqli(DB_HOSTNAME, DB_USER, DB_PASSWORD, DB_DATABASE);
            self::$connection->set_charset("utf8mb4");
        } catch (mysqli_sql_exception $e) {
            throw new Exception("Database connection failed: " . $e->getMessage());
        }
    }


    public static function get_instance(): ?Database {
        if (self::$instance == null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public static function get_connection(): mysqli {
        if (self::$connection === null) {
            self::get_instance();
        }
        return self::$connection;
    }


    private static function get_type($value): string {
        return match (true) {
            is_int($value) => 'i',
            is_float($value) => 'd',
            is_string($value),
            is_null($value) => 's',
            default => 'b',
        };
    }


    /**
     * Prepare a statement with parameters
     */
    private static function prepare(string $query, array $params = []): mysqli_stmt {
        $connection = self::get_connection();
        $statement = $connection->prepare($query);
        $param_values = [];
        $param_types = "";
        if (!empty($params)) {
            foreach ($params as $key => $value) {
                $param_values[] = &$params[$key];
                $param_types .= self::get_type($value);
            }
            $statement->bind_param($param_types, ...$param_values);
        }
        return $statement;
    }

    private static function format_datetime($datetime): string {
        return date("Y-m-d H:i:s", strtotime($datetime));
    }

    public static function create_user($username, $password): bool {
        //Check if the username exists. Fail when it exists
        if (self::exist_user($username)) {
            return false;
        }
        // salting adds uniqueness to each entry.
        $salt = uniqid();
        $salted_password = $salt . $password;
        $encrypted_password = hash("sha512", $salted_password);

        $prepare_stmt = self::prepare("INSERT INTO members (username, password, salt) VALUES (?, ?, ?)", [$username, $encrypted_password, $salt]);

        $insert_result = $prepare_stmt->execute();

        $prepare_stmt->close();
        return $insert_result;
    }

    public static function find_blogs($limit = null): array {
        $blogs = [];

        $query_sql = "SELECT * FROM posts ORDER BY created_at DESC";

        if ($limit !== null) {
            $prepare_stmt = self::prepare($query_sql . " LIMIT ?", ['i' => $limit]);
        } else {
            $prepare_stmt = self::prepare($query_sql);
        }

        $prepare_stmt->execute();
        $query_result = $prepare_stmt->get_result();

        while ($row = $query_result->fetch_assoc()) {
            $row['created_at'] = self::format_datetime($row['created_at']);
            $blogs[] = $row;
        }

        $prepare_stmt->close();
        return $blogs;
    }

    public static function create_post($title, $content): bool {
        $insert_sql = "INSERT INTO posts (title,content,created_at) value (?, ?, null)";
        $prepare_stmt = self::prepare($insert_sql, [$title, $content]);
        $insert_result = $prepare_stmt->execute();
        $prepare_stmt->close();
        return $insert_result;
    }

    private static function exist_user($username): bool {
        $select_sql = "SELECT count(*) as count_num FROM members WHERE username=? ";
        $prepare_stmt = self::prepare($select_sql, [$username]);
        $prepare_stmt->execute();
        $query_result = $prepare_stmt->get_result();
        if ($query_result->num_rows > 0) {
            echo $query_result->fetch_assoc()["count_num"]>0;
        }
        return false;
    }

    /**
     * Log in a user using username and password
     * @param $username
     * @param $password
     * @return bool
     */
    public static function check_login($username, $password): bool {
        if (!isset($username) || !isset($password)) {
            return false;
        }


        if (strlen($username)>255 || strlen($username)<=0 ||strlen($password)>255 || strlen($password)<=0 ) {
            return false;
        }

        $login_result = false;
        $select_sql = "SELECT password,salt FROM members WHERE username=? limit 1";
        $prepare_stmt = self::prepare($select_sql, [$username]);
        $prepare_stmt->execute();
        $query_result = $prepare_stmt->get_result();

        if ($query_result->num_rows > 0) {
            $row = $query_result->fetch_assoc();
            $returned_password = $row['password'];
            $returned_salt = $row['salt'];

            // take clean password, salt and encrypt it as we did in the register page
            $salted_password = $returned_salt . $password;
            $check_password = hash("sha512", $salted_password);

            // If returned password matches entered password, valid login
            $login_result = $check_password == $returned_password && $password <> '';
        }

        return $login_result;

    }

    /**
     * @param $post_id
     * @return bool|array
     */
    public static function find_post_by_id($post_id): bool|array {
        $post_id = filter_var($post_id, FILTER_VALIDATE_INT);
        if (!$post_id) return false;
        $post = false;
        $select_sql = "SELECT * from posts WHERE id = ?";
        $prepare_stmt = self::prepare($select_sql, [$post_id]);
        $prepare_stmt->execute();
        $query_result = $prepare_stmt->get_result();
        if ($query_result->num_rows == 1) {
            $post = $query_result->fetch_assoc();
        }
        return $post;
    }
}

