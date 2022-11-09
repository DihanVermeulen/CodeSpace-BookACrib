<?php

include __DIR__ . '../interface/userInterface.php';

class User implements UserInterface
{
    private $user;
    private $email;
    private $password;

    public function __construct($userInput, $emailInput, $passwordInput)
    {
        $this->user = $userInput;
        $this->email = $emailInput;
        $this->password = $passwordInput;
    }

    /**
     * Set the value of user
     *
     * @return  self
     */
    public function setUser($user)          
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get the value of user
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * Get the value of email
     */ 
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set the value of email
     *
     * @return  self
     */ 
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get the value of password
     */ 
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set the value of password
     *
     * @return  self
     */ 
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * return user object
     * 
     * @return self
     */
    public function __toString()
    {
        return $this->user . '-' . $this->email;
    }
}
