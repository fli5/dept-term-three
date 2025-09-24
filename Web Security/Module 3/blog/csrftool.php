<?php

declare(strict_types=1);


class CSRFTool {
    /**
     * Generate CSRF token
     *
     * @return string CSRF token
     */
    public static function generateCsrf(): string {
        if (session_status() === PHP_SESSION_NONE) {
            session_set_cookie_params([
                'lifetime' => 3600,
                'path' => '/',
                'HttpOnly' => true,
                'SameSite' => 'Strict'
            ]);
            session_start();
        }

        $token = bin2hex(random_bytes(32));
        $_SESSION['csrf_token'] = $token;

        return $token;
    }

    /**
     * Validate CSRF token
     *
     * @param string $token Token to validate
     * @return bool True if valid, false otherwise
     */
    public static function validateCsrf(string $token): bool {
        if (session_status() === PHP_SESSION_NONE) {
            session_set_cookie_params([
                'lifetime' => 3600,
                'path' => '/',
                'HttpOnly' => true,
                'SameSite' => 'Strict'
            ]);
            session_start();
        }

        if (!isset($_SESSION['csrf_token']) || empty($token)) {
            return false;
        }

        $is_equal= hash_equals($_SESSION['csrf_token'], $token);
        unset($_SESSION['csrf_token']);
        return $is_equal;
    }
}
