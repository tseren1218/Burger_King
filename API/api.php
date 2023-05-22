<?php

// Database connection configuration
$db_host = '127.0.0.1';
$db_port = '5432';
$db_name = 'burger_king';
$db_user = 'postgres';
$db_password = '123';

// Establish a database connection
$pdo = new PDO("pgsql:host=$db_host;port=$db_port;dbname=$db_name;user=$db_user;password=$db_password");

// Set the response content type to JSON
header('Content-Type: application/json');

// Handle the GET request to /api/burgers
if ($_SERVER['REQUEST_METHOD'] === 'GET' && $_SERVER['REQUEST_URI'] === '/api/burgers') {
    try {
        // Prepare and execute the SQL query
        $stmt = $pdo->query('SELECT * FROM burgers');
        $burgers = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Return the JSON response
        echo json_encode($burgers);
    } catch (PDOException $e) {
        // Return an error response if there's an issue with the query
        http_response_code(500);
        echo json_encode(['error' => 'Failed to retrieve burgers']);
    }

    // Close the database connection
    $pdo = null;
}
