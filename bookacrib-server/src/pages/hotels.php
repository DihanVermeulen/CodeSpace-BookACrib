<?php
include_once __DIR__ . './../dbconn/dbconn.php';
include __DIR__ . './../includes/functions.php';
include __DIR__ . './../model/hotel.php';
error_reporting(E_ALL);
ini_set('display_errors', 'on');

// Sorts table according to columns
if (isset($_POST['asc_hotelID'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_id asc";
} else if (isset($_POST['desc_hotelID'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_id desc";
} else if (isset($_POST['asc_hotelName'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_name asc";
} else if (isset($_POST['desc_hotelName'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_name desc";
} else if (isset($_POST['asc_hotelRating'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_rating desc";
} else if (isset($_POST['desc_hotelRating'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_rating desc";
} else if (isset($_POST['asc_hotelRate'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_rate desc";
} else if (isset($_POST['desc_hotelRate'])) {
    $get_all_hotels_query = "SELECT * FROM hotels ORDER BY hotel_rate desc";
} else {
    $get_all_hotels_query = "SELECT * FROM hotels";
}


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
            <th>Hotel ID
                <a class='dropdown-trigger btn' href='#' data-target='hotel_id_dropdown'>Sort</a>
                <ul id='hotel_id_dropdown' class='dropdown-content'>
                    <form method="POST">
                        <button class="btn waves-effect waves-light" type="submit" name="asc_hotelID">ASC<i class="material-icons">arrow_upward</i></button>
                        <button class="btn waves-effect waves-light" type="submit" name="desc_hotelID">DESC<i class="material-icons">arrow_downward</i></button>
                    </form>
                </ul>
            </th>
            <th>Hotel
                <a class='dropdown-trigger btn' href='#' data-target='hotel_name_dropdown'>Sort</a>
                <ul id='hotel_name_dropdown' class='dropdown-content'>
                    <form method="POST">
                        <button class="btn waves-effect waves-light" type="submit" name="asc_hotelName">ASC<i class="material-icons">arrow_upward</i></button>
                        <button class="btn waves-effect waves-light" type="submit" name="desc_hotelName">DESC<i class="material-icons">arrow_downward</i></button>
                    </form>
                </ul>
            </th>
            <th>Hotel Rating
                <a class='dropdown-trigger btn' href='#' data-target='hotel_rating_dropdown'>Sort</a>
                <ul id='hotel_rating_dropdown' class='dropdown-content'>
                    <form method="POST">
                        <button class="btn waves-effect waves-light" type="submit" name="asc_hotelRating">ASC<i class="material-icons">arrow_upward</i></button>
                        <button class="btn waves-effect waves-light" type="submit" name="desc_hotelRating">DESC<i class="material-icons">arrow_downward</i></button>
                    </form>
                </ul>
            </th>
            <th>Hotel Rate
                <a class='dropdown-trigger btn' href='#' data-target='hotel_rate_dropdown'>Sort</a>
                <ul id='hotel_rate_dropdown' class='dropdown-content'>
                    <form method="POST">
                        <button class="btn waves-effect waves-light" type="submit" name="asc_hotelRate">ASC<i class="material-icons">arrow_upward</i></button>
                        <button class="btn waves-effect waves-light" type="submit" name="desc_hotelRate">DESC<i class="material-icons">arrow_downward</i></button>
                    </form>
                </ul>
            </th>
            <th>Image Location</th>
        </tr>
    </thead>

    <tbody>
        <?php
        foreach ($hotelsResponse as $row) {
            echo "<tr id='" . $row['hotel_id'] . "'>
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
    <div class="card-panel hoverable">

        <h4>Create new hotel</h4>
        <div class="row">
            <form class="col s12" action="" method="POST">
                <div class="row">
                    <div class="input-field col s12 m4">
                        <input id="hotel_name_input" name="hotel_name_input" type="text" class="validate" required>
                        <label for="hotel_name_input">*Hotel name</label>
                    </div>

                    <div class="input-field col s12 m4">
                        <input id="hotel_rating_input" name="hotel_rating_input" type="number" min=1 max=5 class="validate" required>
                        <label for="hotel_rating_input">*Hotel rating</label>
                    </div>


                    <div class="input-field col s12 m4">
                        <input id="hotel_rate_input" name="hotel_rate_input" type="number" min=1 class="validate" required>
                        <label for="hotel_rate_input">*Hotel rate</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field center-align">
                        <button id="hotel_submit" type="submit" name="submit_hotel" class="btn waves-effect waves-light">
                            Create
                            <i class="material-icons right">send</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <h4>Update hotel</h4>
        <div class="row">
            <form class="col s12" action="" method="POST">
                <div class="row">
                    <div class="input-field col s12 m4">
                        <input id="hotel_id_update_input" name="hotel_id_update_input" type="number" class="validate" required>
                        <label for="hotel_id_update_input">*Hotel ID</label>
                    </div>

                    <div class="input-field col s12 m4">
                        <input id="hotel_name_update_input" name="hotel_name_update_input" type="text" class="validate" required>
                        <label for="hotel_name_update_input">*Hotel name</label>
                    </div>

                    <div class="input-field col s12 m4">
                        <input id="hotel_rating_update_input" name="hotel_rating_update_input" type="number" min=1 max=5 class="validate" required>
                        <label for="hotel_rating_update_input">*Hotel rating</label>
                    </div>


                    <div class="input-field col s12 m4">
                        <input id="hotel_rate_update_input" name="hotel_rate_update_input" type="number" min=1 class="validate" required>
                        <label for="hotel_rate_update_input">*Hotel rate</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field center-align">
                        <button id="hotel_update_submit" type="submit" name="hotel_update_submit" class="btn waves-effect waves-light">
                            Update
                            <i class="material-icons right">update</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <h4>Delete hotel</h4>
        <div class="row">
            <form class="col s12" action="" method="POST">
                <div class="row">
                    <div class="input-field col s12 m4">
                        <input id="hotel_id_delete_input" name="hotel_id_delete_input" type="number" class="validate" required>
                        <label for="hotel_id_delete_input">*Hotel ID</label>
                    </div>
                </div>

                <div class="row">
                    <div class="input-field center-align">
                        <button id="hotel_delete_submit" type="submit" name="hotel_delete_submit" class="btn waves-effect waves-light">
                            Delete
                            <i class="material-icons right">delete</i>
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<?php
// Creates new hotel and inserts into database
if (isset($_POST['submit_hotel'])) {
    $hotel_name = $_POST['hotel_name_input'];
    $hotel_rating = $_POST['hotel_rating_input'];
    $hotel_rate = $_POST['hotel_rate_input'];
    // Selects random image
    $hotel_image = ['la_residence', 'royal_malewena', 'the_silo'];

    $hotel_create = new Hotel($hotel_name, $hotel_rating, $hotel_rate, $hotel_image);
    $hotel_create_object = $hotel_create->getHotelObject();

    // Checks if values are empty
    if (!(empty($hotel_create_object['hotel_name']) && empty($hotel_create_object['hotel_rating']) && empty($hotel_create_object['hotel_rate']))) {
        $insert_hotel_query = "INSERT INTO hotels (hotel_name, hotel_rate, hotel_rating, image) 
        VALUES(?, ?, ?, ?)";

        try {
            $stmt = $db_connection->prepare($insert_hotel_query);
            $stmt->bind_param('siis', $hotel_create_object['hotel_name'], $hotel_create_object['hotel_rate'], $hotel_create_object['hotel_rating'], $hotel_create_object['hotel_image']);

            $stmt->execute();
        } catch (PDOException $err) {
            echo "Error inserting hotel: $err";
        }
    }
}

if (isset($_POST['hotel_update_submit'])) {
    $hotel_id = $_POST['hotel_id_update_input'];
    $hotel_name = $_POST['hotel_name_update_input'];
    $hotel_rating = $_POST['hotel_rating_update_input'];
    $hotel_rate = $_POST['hotel_rate_update_input'];
    $hotel_image = ['la_residence', 'royal_malewena', 'the_silo'];

    if(checkIfIDExists($hotelsResponse, $hotel_id, "hotel_id")) {
        $hotel_update = new Hotel($hotel_name, $hotel_rating, $hotel_rate, $hotel_image);
        $hotel_update_object = $hotel_update->getHotelObject();
    
        // Checks if values are empty
        if (!(empty($hotel_update_object['hotel_name']) && empty($hotel_update_object['hotel_rating']) && empty($hotel_update_object['hotel_rate']))) {
            $update_hotel_query = "UPDATE hotels set hotel_name = ?, hotel_rate = ?, hotel_rating = ? WHERE hotel_id = ?";
    
            try {
                $stmt = $db_connection->prepare($update_hotel_query);
                $stmt->bind_param('siii', $hotel_update_object['hotel_name'], $hotel_update_object['hotel_rate'], $hotel_update_object['hotel_rating'], $hotel_id);
    
                $stmt->execute();
                echo "<meta http-equiv='refresh' content='0'>"; // Refreshes page
            } catch (PDOException $err) {
                echo "Error updating hotel: $err";
            }
        }
    } else {
        echo "id does not exist";
    }


}
