<?php
include_once __DIR__ . './../dbconn/dbconn.php';

// Sorts table according to columns
if(isset($_POST['asc_userName'])) {
    $get_all_users_query = "SELECT * FROM users ORDER BY user_name ASC";
} else if(isset($_POST['desc_userName'])) {
    $get_all_users_query = "SELECT * FROM users ORDER BY user_name DESC";
} else {
    $get_all_users_query = "SELECT * FROM users";
}

try {
    $result = $db_connection->query($get_all_users_query);

    while ($row = $result->fetch_assoc()) {
        $usersResponse[] = $row;
    }
} catch (PDOException $err) {
    echo "Error fetching resources: $err";
}
?>

<table class='highlight centered striped'>
    <thead>
        <tr>
            <th>User ID</th>
            <th>User Name
                <a class='dropdown-trigger btn' href='#' data-target='users_name_dropdown'>Sort</a>
                <ul id='users_name_dropdown' class='dropdown-content'>
                    <form method="POST">
                        <button class="btn waves-effect waves-light" type="submit" name="asc_userName">ASC<i class="material-icons">arrow_upward</i></button>
                        <button class="btn waves-effect waves-light" type="submit" name="desc_userName">DESC<i class="material-icons">arrow_downward</i></button>
                    </form>
                </ul>
            </th>
            <th>User Email</th>
            <th>User Password</th>
        </tr>
    </thead>

    <tbody>
        <?php
        foreach ($usersResponse as $row) {
            echo "<tr>
                    <td>" . $row['user_id'] . "</td>
                    <td>" . $row['user_name'] . "</td>
                    <td>" . $row['user_email'] . "</td>
                    <td>" . $row['user_password'] . "</td>
                </tr>";
        }
        ?>
    </tbody>
</table>