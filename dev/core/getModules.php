<?php
include './inc.php';
$modules =[
    array(
        'id' => 1,
        'title' => 'Архитектор одежды',
        'subtitle' => 'Курс конструирования и моделирования одежды системой "Любакс"',
    ),
    array(
        'id' => 2,
        'title' => 'Швейная библиотека',
        'subtitle' => '',
    )
];

echo json_encode($modules);