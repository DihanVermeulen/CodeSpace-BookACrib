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

<div class="container">
    <div class="row">
        <form class="col s12" action="" method="POST">
            <div class="row">
                <div class="input-field col s12 m4">
                    <input id="hotel_name_input" name="hotel_name_input" type="text" class="validate" required>
                    <label for="hotel_name_input">Hotel name</label>
                </div>

                <div class="input-field col s12 m4">
                    <input id="hotel_rating_input" name="hotel_rating_input" type="number" min=1 max=5 class="validate" required>
                    <label for="hotel_rating_input">Hotel rating</label>
                </div>


                <div class="input-field col s12 m4">
                    <input id="hotel_rate_input" name="hotel_rate_input" type="number" min=1 class="validate" required>
                    <label for="hotel_rate_input">Hotel rate</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field center-align">
                    <button id="hotel_submit" type="submit" name="submit_hotel" class="btn waves-effect waves-light">
                        Submit
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>

        </form>
    </div>
</div>

<?php
if (isset($_POST['submit_hotel'])) {
    $hotel_name = $_POST['hotel_name_input'];
    $hotel_rating = $_POST['hotel_rating_input'];
    $hotel_rate = $_POST['hotel_rate_input'];
    // Selects random image
    $hotel_image = random_pic(['la_residence', 'royal_malewena', 'the_silo']);

    $hotel = new Hotel($hotel_name, $hotel_rating, $hotel_rate, $hotel_image);
    $hotel_object = $hotel->getHotelObject();

    if (!(empty($hotel_object['hotel_name']) && empty($hotel_object['hotel_rating']) && empty($hotel_object['hotel_rate']))) {
        $insert_hotel_query = "INSERT INTO hotels (hotel_name, hotel_rate, hotel_rating, image) 
        VALUES(?, ?, ?, ?)";

        try {
            $stmt = $db_connection->prepare($insert_hotel_query);
            $stmt->bind_param('siis', $hotel_object['hotel_name'], $hotel_object['hotel_rate'], $hotel_object['hotel_rating'], $hotel_object['hotel_image']);

            $stmt->execute();
        } catch (PDOException $err) {
            echo "Error inserting hotel: $err";
        }
    }
}
