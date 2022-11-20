<?php

/**
 * @return boolean
 * @param mixed $array takes in array
 * @param number $id id to search for
 * @param string $idArg id argument
 */
function checkIfIDExists($array, $id, $idArg) {
    foreach($array as $row) {
        if($row[$idArg] == $id) {
            return true;
            break;
        }
    }
    return false;
}
