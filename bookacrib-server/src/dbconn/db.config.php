<?php

class DbConfig
{

    private $host = 'localhost';
    private $user = 'root';
    private $password = '';
    private $db = 'hotel_booking';

    public function connectToDatabase()
    {
        $db_connection = new mysqli($this->host, $this->user, $this->password, $this->db);

        if ($db_connection->connect_error) {
            die("Connection failed: " . $db_connection->connect_error);

        } else {
            return $db_connection;
        }
    }
}
