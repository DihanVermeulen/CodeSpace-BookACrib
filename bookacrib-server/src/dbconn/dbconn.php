<?php

require __DIR__ . './db.config.php';

// Creates connection to database
$db_connection = new mysqli(server_host, server_username, server_password, dbname);

// Checks connection to database
if ($db_connection->connect_errno) {
    echo "Failed to connect to MySQL: " . $db_connection->connect_error;
    exit();
}