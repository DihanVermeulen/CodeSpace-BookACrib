<?php

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

$app->post('/users', function (Request $request, Response $response) {
    require_once('../dbconn/dbconn.php');

    // $user = new User($request->getParsedBody()['userName'], $request->getParsedBody()['userEmail'], $request->getParsedBody()['userPassword'], $request->getParsedBody()['userRole']);
    $data = $request->getParsedBody();

    // $test_user_name = $request->params;

    $requestData = $request->getParsedBody();

    $user = new User($requestData['userName'], $requestData['userEmail'], $requestData['userPassword'], $requestData['userRole']);
    $userObject = $user->createUser();

    // $html = var_export($userObject, true);
    // $response->getBody()->write($html);

    $user_id = $userObject['user_id'];
    $user_name = $userObject['user_name'];
    $user_email = $userObject['user_email'];
    $user_password = $userObject['user_password'];

    $query = "INSERT INTO users (user_id, user_name, user_email, user_password) VALUES (?,?,?,?)";
    // $query = "INSERT INTO users (user_id, user_name, user_email, user_password) VALUES ($user_id,$user_name, $user_email,$user_password)";
    // $response->getBody()->write(json_encode($stmt));
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
});


$app->run();
