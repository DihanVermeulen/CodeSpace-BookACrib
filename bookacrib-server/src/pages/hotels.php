<?php
include_once __DIR__ . './../dbconn/dbconn.php';
include __DIR__ . './../includes/functions.php';
error_reporting(E_ALL);
ini_set('display_errors', 'on');

$get_all_hotels_query = "SELECT * FROM hotels";

try {
    $result = $db_connection->query($get_all_hotels_query);

    while ($row = $result->fetch_assoc()) {
        $hotelsResponse[] = $row;
    }
} catch (PDOException $err) {
    echo "Error fetching resources: $err";
}
?>
<table class='highlight centered striped'>
    <thead>
        <tr>
            <th>Hotel ID</th>
            <th>Hotel</th>
            <th>Hotel Rating</th>
            <th>Hotel Rate</th>
            <th>Image Location</th>
        </tr>
    </thead>

    <tbody>
        <?php
        foreach ($hotelsResponse as $row) {
            echo "<tr>
                    <td>" . $row['hotel_id'] . "</td>
                    <td>" . $row['hotel_name'] . "</td>
                    <td>" . $row['hotel_rating'] . "</td>
                    <td>" . $row['hotel_rate'] . "</td>
                    <td>" . $row['image'] . "</td>
                    </tr>";
        }
        ?>
    </tbody>
</table>