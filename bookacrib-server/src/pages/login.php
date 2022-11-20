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
    <link rel="stylesheet" href="..\styles\styles.css">

    <!-- Materialize javascript cdn -->
    <script defer src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <title>Document</title>
</head>

<body>

    <div class="container">
        <div class="col s6 m5">
            <div class="card grey darken-3">
                <div class="card-content white-text">
                    <span class="card-title">Login</span>
                    <form method="POST" action="<?= $_SERVER['PHP_SELF'] ?>">
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="login_email" type="text" name="login_email" class="validate">
                                <label class="active" for="login_email">*Email</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s6">
                                <input id="login_password" type="password" name="login_password" class="validate">
                                <label class="active" for="login_password">*Password</label>
                            </div>
                        </div>
                        <button type="submit" class="btn-large pulse waves-effect waves-light">Login</button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.6.1.js"></script>
</body>

</html>