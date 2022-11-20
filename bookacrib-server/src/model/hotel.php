<?php

class Hotel
{
    private const BASE_IMAGE_URL = 'http://localhost:9000/src/public/images/';
    private $hotel_name;
    private $hotel_rating;
    private $hotel_rate;

    public function __construct($hotel_name, $hotel_rating, $hotel_rate, $hotel_image)
    {
        $this->hotel_name = $hotel_name;
        $this->hotel_rating = $hotel_rating;
        $this->hotel_rate = $hotel_rate;
        $this->hotel_image = $hotel_image;
    }

    private function randomPic($filesArray)
    {
        $file = array_rand($filesArray);
        return $filesArray[$file];
    }

    /**
     * Gets hotel object
     */
    public function getHotelObject() {
        return array(
            "hotel_name"=> $this->hotel_name,
            "hotel_rating"=> intval($this->hotel_rating),
            "hotel_rate"=> intval($this->hotel_rate),
            "hotel_image"=> self::BASE_IMAGE_URL . $this->randomPic($this->hotel_image)
        );
    }

    /**
     * Get the value of hotel_name
     */
    public function getHotel_name()
    {
        return $this->hotel_name;
    }

    /**
     * Set the value of hotel_name
     *
     * @return  self
     */
    public function setHotel_name($hotel_name)
    {
        $this->hotel_name = $hotel_name;

        return $this;
    }

    /**
     * Get the value of hotel_rating
     */
    public function getHotel_rating()
    {
        return $this->hotel_rating;
    }

    /**
     * Set the value of hotel_rating
     *
     * @return  self
     */
    public function setHotel_rating($hotel_rating)
    {
        $this->hotel_rating = $hotel_rating;

        return $this;
    }

    /**
     * Get the value of hotel_rate
     */
    public function getHotel_rate()
    {
        return $this->hotel_rate;
    }

    /**
     * Set the value of hotel_rate
     *
     * @return  self
     */
    public function setHotel_rate($hotel_rate)
    {
        $this->hotel_rate = $hotel_rate;

        return $this;
    }

    /**
     * Get the value of hotel_image
     */
    public function getHotel_image()
    {
        return $this->hotel_image;
    }

    /**
     * Set the value of hotel_image
     *
     * @return  self
     */
    public function setHotel_image($hotel_image)
    {
        $this->hotel_image = $hotel_image;

        return $this;
    }
}
