<?php

interface UserInterface {
    public function setUser($user);
    public function getUser();
    public function setEmail($email);
    public function getEmail();
    public function setPassword($password);
    public function getPassword();
}