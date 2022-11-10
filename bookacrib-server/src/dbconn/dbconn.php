<?php

require __DIR__ . './db.config.php';

// Creates connection to database
$db_config = new DbConfig();
$db_connection = $db_config->connectToDatabase();

// Checks connection to database
if ($db_connection->connect_errno) {
    echo "Failed to connect to MySQL: " . $db_connection->connect_error;
    exit();
}