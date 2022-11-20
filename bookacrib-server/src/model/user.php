<?php

class User
{
    private $user;
    private $email;
    private $password;
    private $role;

    public function __construct($user, $email, $password, $role)
    {
        $this->user = $user;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
    }

    private function generateId()
    {

        $randomNumber = rand(10000, 90000);
        $id = md5($randomNumber);

        switch ($this->role) {

            case 'admin':
                $adminCode = "A#";
                return $adminCode . $id;
                break;

            case 'customer':
                $customerCode = "C#";
                return $customerCode . $id;
                break;

            default:
                return "error in creating user id";
                break;
        }
    }

    public function createUser()
    {
        return array(
            "user_id" => $this->generateId(),
            "user_name" => $this->user,
            "user_password" => password_hash($this->password, PASSWORD_BCRYPT),
            "user_email" => $this->email,
        );
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
