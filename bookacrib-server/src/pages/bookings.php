<?php
require __DIR__ . './../dbconn/dbconn.php';

$get_all_bookings_query = "SELECT * FROM bookings";

try {
    $result = $db_connection->query($get_all_bookings_query);

    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }
} catch (PDOException $err) {
    echo $err;
}
?>