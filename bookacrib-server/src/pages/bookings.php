<?php
require __DIR__ . './../dbconn/dbconn.php';

$get_all_bookings_query = "SELECT * FROM bookings";

try {
    $result = $db_connection->query($get_all_bookings_query);

    while ($row = $result->fetch_assoc()) {
        $bookingsResponse[] = $row;
    }
} catch (PDOException $err) {
    echo $err;
}
?>
<table class='highlight centered striped'>
    <thead>
        <tr>
            <th>Booking ID</th>
            <th>Hotel ID</th>
            <th>User ID</th>
            <th>Hotel</th>
            <th>Date Created</th>
            <th>Arrival Date</th>
            <th>Departure Date</th>
        </tr>
    </thead>

    <tbody>
        <?php
        foreach ($bookingsResponse as $row) {
            echo "<tr>
                    <td>" . $row['booking_id'] . "</td>
                    <td>" . $row['hotel_id'] . "</td>
                    <td>" . $row['user_id'] . "</td>
                    <td>" . $row['hotel_name'] . "</td>
                    <td>" . explode(' ', $row['created'])[0] . "</td>
                    <td>" . explode(' ', $row['arrival_date'])[0] . "</td>
                    <td>" . explode(' ', $row['departure_date'])[0] . "</td>
                </tr>";
        }
        ?>
    </tbody>
</table>