<?php

function random_pic($filesArray)
{
    $file = array_rand($filesArray);
    return $filesArray[$file];
}
