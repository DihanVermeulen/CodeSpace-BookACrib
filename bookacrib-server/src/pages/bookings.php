<?php
include_once __DIR__ . './../dbconn/dbconn.php';

// Sorts hotels according to column
if (isset($_POST['asc_bookings_hotelName'])) {
    $get_all_bookings_query = "SELECT * FROM bookings ORDER BY hotel_name ASC";
} else if (isset($_POST['desc_bookings_hotelName'])) {
    $get_all_bookings_query = "SELECT * FROM bookings ORDER BY hotel_name DESC";
} else if (isset($_POST['search_bookings_submit'])) {
    $get_all_bookings_query = "SELECT * FROM hotels WHERE hotel_name LIKE '%" . $_POST['search_bookings_input'] . "%'";
} else {
    $get_all_bookings_query = "SELECT * FROM bookings";
}

try {
    $result = $db_connection->query($get_all_bookings_query);

    if (mysqli_num_rows($result) == 0) {
        echo "No records found";
    } else {
        while ($row = $result->fetch_assoc()) {
            $bookingsResponse[] = $row;
        }
    }
} catch (PDOException $err) {
    echo $err;
}
?>

<!-- Searchbar -->
<div class="row">
    <div class="valign-wrapper">
        <div class="nav-wrapper col s4">
            <form method="POST" action="<?= $_SERVER['PHP_SELF']; ?>">
                <div class="input-field">
                    <input id="search_bookings_input" type="search" name="search_bookings_input" required>
                    <label class="label-icon" for="search_bookings_input"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
                </div>
        </div>
        <div class="col s8">
            <button type="submit" class="btn-small waves-effect waves-light" name="search_bookings_submit">Search</button>
        </div>
        </form>
    </div>
</div>

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