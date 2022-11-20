<?php
include_once __DIR__ . './../dbconn/dbconn.php';

$get_all_users_query = "SELECT * FROM users";

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
            <th>User Name</th>
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