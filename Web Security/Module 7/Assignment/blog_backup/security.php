<?php
# Set X-Content-Type-Options: nosniff, prohibits browsers from sniffing file types,
# forces browsers to comply with the MIME type declared by the server, and avoids XSS attacks.
header("Content-Type: text/html; charset=UTF-8");
header("X-Content-Type-Options: nosniff");

// Enable Content-Security-Policy (CSP) HTTP header to prevent XSS attacks and clickjacking
header("Content-Security-Policy: default-src 'self'; frame-ancestors 'self'; script-src 'self'; style-src 'self';img-src 'self' data:;font-src 'self';object-src 'none';base-uri 'self';form-action 'self';");

// Avoid server version information leaking from Server response headers
// and prevent attackers from exploiting known vulnerabilities in server version search
header_remove("X-Powered-By");
header_remove("Server");

# Set HttpOnly cookies to prohibit JavaScript access to cookies, prevent XSS from stealing cookies
# Set SameSite, cookies to be sent only when requested by the same site to prevent CSRF (cross-site request forgery) attacks
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 3600,
        'path' => '/',
        'HttpOnly' => true,
        'SameSite' => 'Strict'
    ]);
    session_start();
}
