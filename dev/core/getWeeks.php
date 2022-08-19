<?php
include './inc.php';
$id = $_GET['id'];


$weeks = [
    1=>[
        'title'=>'Архитектор одежды',
        'subtitle'=>'Курс конструирования и моделирования одежды системой "Любакс"',
        'weeks'=>[[
                'id' => '1',
                'title'=> 'Неделя 1',
                'description'=> 'Описание недели',
                'video_description'=> 'https://www.youtube.com/watch?v=zPNi78sVbio&ab_channel=WorkMusicLab'
            ],[
                'id' => '2',
                'title'=> 'Неделя 2',
                'description'=> 'Описание недели 2' ,
                'video_description'=> 'https://www.youtube.com/watch?v=zPNi78sVbio&ab_channel=WorkMusicLab'
            ]
        ]
    ]
];
echo json_encode($weeks[$id]);