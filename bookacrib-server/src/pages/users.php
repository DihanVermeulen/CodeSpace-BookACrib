<?php
include_once __DIR__ . './../dbconn/dbconn.php';

// Sorts table according to columns
if (isset($_POST['asc_userName'])) {
    $get_all_users_query = "SELECT * FROM users ORDER BY user_name ASC";
} else if (isset($_POST['desc_userName'])) {
    $get_all_users_query = "SELECT * FROM users ORDER BY user_name DESC";
} else if (isset($_POST['search_users_submit'])) {
    $get_all_users_query = "SELECT * FROM users WHERE user_name LIKE '%" . $_POST['search_users_input'] . "%'";
} else {
    $get_all_users_query = "SELECT * FROM users";
}

try {
    $result = $db_connection->query($get_all_users_query);

    if (mysqli_num_rows($result) == 0) {
        echo "no records found";
    } else {
        while ($row = $result->fetch_assoc()) {
            $usersResponse[] = $row;
        }
    }
} catch (PDOException $err) {
    echo "Error fetching resources: $err";
}
?>

<!-- Searchbar -->
<div class="row">
    <div class="valign-wrapper">
        <div class="nav-wrapper col s4">
            <form method="POST" action="<?= $_SERVER['PHP_SELF']; ?>">
                <div class="input-field">
                    <input id="search_users_input" type="search" name="search_users_input" required>
                    <label class="label-icon" for="search_users_input"><i class="material-icons">search</i></label>
                    <i class="material-icons">close</i>
                </div>
        </div>
        <div class="col s8">
            <button type="submit" class="btn-small waves-effect waves-light" name="search_users_submit">Search</button>
        </div>
        </form>
    </div>
</div>

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