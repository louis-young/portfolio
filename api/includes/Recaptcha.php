<?php

class Recaptcha
{
    public function __construct($key, $token)
    {
        $this->key = $key;
        $this->token = $token;
        $this->validate();
    }

    public function validate()
    {
        $data = array(
            'secret' => $this->key,
            'response' => $this->token
        );

        $verify = curl_init();

        $url = "https://www.google.com/recaptcha/api/siteverify";

        curl_setopt($verify, CURLOPT_URL, $url);
        curl_setopt($verify, CURLOPT_POST, true);
        curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($verify, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);

        $response = json_decode(curl_exec($verify));

        $this->score = $response->score;
    }
}
