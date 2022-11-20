<?php
session_start();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Materialize css cdn -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

    <!-- Link to materialize icons -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- Custom stylesheet link -->
    <link rel="stylesheet" href="src\styles\styles.css">

    <!-- Materialize javascript cdn -->
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>

    <title>Book a Crib Administration</title>
</head>

<body>
    <nav class="nav-extended">
        <div class="nav-wrapper grey darken-3">
            <img class="logo" src="src/assets/images/logo.png" alt="logo">
            <a href="#" data-target="mobile-menu" class="sidenav-trigger"><i class="material-icons">menu</i></a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li><a href="sass.html">Login</a></li>
                <li><a href="sass.html">Logout</a></li>
            </ul>
        </div>

        <ul class="sidenav" id="mobile-menu">
            <li><a href="sass.html">Login</a></li>
            <li><a href="sass.html">Logout</a></li>
        </ul>

        <div class="nav-content">
            <ul class="tabs tabs-transparent grey darken-3">
                <li class="tab"><a href="#users" data-toggle="tab">Users</a></li>
                <li class="tab"><a href="#bookings" data-toggle="tab">Bookings</a></li>
                <li class="tab"><a href="#hotels" data-toggle="tab">Hotels</a></li>
            </ul>
        </div>
    </nav>


    <div id="users" class="col s12">
        <?php
        include_once('src/pages/users.php');
        ?>
    </div>
    <div id="bookings" class="col s12">
        <?php
        include_once('src/pages/bookings.php');
        ?>
    </div>
    <div id="hotels" class="col s12">
        <?php
        include_once('src/pages/hotels.php');
        ?>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.1.js"></script>
    <script>
        $(document).ready(function() {
            $('.tabs').tabs();
            $('.dropdown-trigger').dropdown();
            $('.sidenav').sidenav();
        });
    </script>
</body>

</html>