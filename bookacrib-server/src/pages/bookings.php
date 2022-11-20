<?php
include_once __DIR__ . './../dbconn/dbconn.php';

// Sorts hotels according to column
if (isset($_POST['asc_bookings_hotelName'])) {
    $get_all_bookings_query = "SELECT * FROM bookings ORDER BY hotel_name ASC";
} else if (isset($_POST['desc_bookings_hotelName'])) {
    $get_all_bookings_query = "SELECT * FROM bookings ORDER BY hotel_name DESC";
} else {
    $get_all_bookings_query = "SELECT * FROM bookings";
}

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
            <th>Hotel
                <a class='dropdown-trigger btn' href='#' data-target='bookings_hotel_name_dropdown'>Sort</a>
                <ul id='bookings_hotel_name_dropdown' class='dropdown-content'>
                    <form method="POST">
                        <button class="btn waves-effect waves-light" type="submit" name="asc_bookings_hotelName">ASC<i class="material-icons">arrow_upward</i></button>
                        <button class="btn waves-effect waves-light" type="submit" name="desc_bookings_hotelName">DESC<i class="material-icons">arrow_downward</i></button>
                    </form>
                </ul>
            </th>
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