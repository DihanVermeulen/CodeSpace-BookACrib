<?php

use LDAP\Result;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

include '../model/user.php';

require '../vendor/autoload.php';

$app = new \Slim\App();

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE,PATCH,OPTIONS');

$app->get('/hotels', function () {
    require_once('../dbconn/dbconn.php');
    $query = "SELECT * FROM hotels";
    $result = $db_connection->query($query);


    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }

    echo json_encode($response);
});

// Post to create user and add into database
$app->post('/register', function (Request $request, Response $response) {
    require_once('../dbconn/dbconn.php');
    $data = $request->getParsedBody();

    $user = new User($data['userName'], $data['userEmail'], $data['userPassword'], $data['userRole']);
    $userObject = $user->createUser();

    $user_id = $userObject['user_id'];
    $user_name = $userObject['user_name'];
    $user_email = $userObject['user_email'];
    $user_password = $userObject['user_password'];

    $query = "INSERT INTO users (user_id, user_name, user_email, user_password) VALUES (?,?,?,?)";

    try {
        $stmt = $db_connection->prepare($query);

        $stmt->bind_param('ssss', $user_id, $user_name, $user_email, $user_password);

        $result = $stmt->execute();

        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(200);
    } catch (PDOException $e) {
        $error = array(
            "message" => $e->getMessage()
        );
        $response->getBody()->write(json_encode($error));
        return $response
            ->withHeader('content-type', 'application/json')
            ->withStatus(500);
    }
});

$app->get('/users', function () {
    require_once('../dbconn/dbconn.php');

    $query = "SELECT user_name, user_email FROM users";
    $result = $db_connection->query($query);


    while ($row = $result->fetch_assoc()) {
        $response[] = $row;
    }

    echo json_encode($response);
});

$app->get('/login', function (Request $request) {
    require_once('../dbconn/dbconn.php');
    $data = $request->getQueryParams();

    $user_email = $data['user_email'];
    $user_password = $data['user_password'];

    $query = "SELECT user_id, user_password FROM users WHERE user_email = '$user_email'";

    try {
        $result = $db_connection->query($query);

        // Returns false if email doesn't exist
        if (mysqli_num_rows($result) == 0) {
            echo json_encode(false);
        } else {
            while ($row = $result->fetch_assoc()) {
                $response[] = $row;
            }

            // Checks if requested password matches encrypted password
            if (password_verify($user_password, $response[0]['user_password'])) {
                echo json_encode($response);
            } else {
                echo json_encode(false);
            }
        }
    } catch (PDOException $e) {
        echo $e;
    }
});

$app->post(
    '/login',
    function (Request $request, Response $response) {
        require_once('../dbconn/dbconn.php');
        $update = $request->getParsedBody();

        $query = "INSERT INTO sessions (session_state, user_id, created, ip) VALUES (?, ?, ?, ?)";

        $state_update = $update['user_update'];
        $user_id = $update['user_id'];

        try {
            // Preparing query for binding
            $stmt = $db_connection->prepare($query);

            // Variables that goes into query
            $time = time();
            $ip = $_SERVER['REMOTE_ADDR'];
            $state_update = $update['user_update'];
            $user_id = $update['user_id'];

            // Binding variables and executing query
            $stmt->bind_param('ssss', $state_update, $user_id, $time, $ip);
            $stmt->execute();

            // Returns if success
            return $response
                ->withHeader('content-type', 'application/json')
                ->withStatus(200);

            // Returns if fail
        } catch (PDOException $e) {
            $error = array(
                "message" => $e->getMessage()
            );
            $response->getBody()->write(json_encode($error));
            return $response
                ->withHeader('content-type', 'application/json')
                ->withStatus(500);
        }
    }
);

$app->get('/session', function (Request $request) {
    require_once('../dbconn/dbconn.php');
    $requestData = $request->getQueryParams();

    $query = "SELECT user_id, MAX(created) AS most_recent_signin FROM sessions WHERE user_id ='C#4bad5bff81a6c882200496950260a6e1'"; // Gets last session of user

    try {
        $result = $db_connection->query($query);

        while ($row = $result->fetch_assoc()) {
            $response[] = $row;
        }
        echo json_encode($response);
    } catch (PDOException $e) {
        echo $e;
    }
});

$app->run();
