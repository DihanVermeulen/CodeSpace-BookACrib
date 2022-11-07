<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App([
    "settings"  => [
        "determineRouteBeforeAppMiddleware" => true,
    ]
]);

header('Access-Control-Allow-Origin: *');

$app->get('/hotels', function (Request $request, Response $response, array $args) {
    $response = [
        [
            "hotel_name" => "The Silo",
            "rating" => 5,
            "rate" => 1000,
            "image" => "http://localhost:9000/src/public/images/thesilo.jpg"
        ]
    ];

    echo json_encode($response);
});
$app->run();
