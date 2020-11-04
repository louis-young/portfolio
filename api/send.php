<?php

include './includes/Recaptcha.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

/**
 * Custom Form Handler.
 *
 * @author Louis Young.
 */

if (!isset($_POST['fields'])) {
    exit;
}

$fields = json_decode($_POST['fields']);


// Development mode for error reporting.
$development = true;

if ($development) {
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
}

/**
 * Mail.
 *
 * Send custom mail.
 */

class Mail
{
    private $recipient,
        $subject,
        $headers,
        $fields,
        $body,
        $styles,
        $score;

    public function __construct($configuration)
    {
        $this->recipient = $configuration['recipient'];
        $this->subject   = $configuration['subject'];
        $this->headers    = $configuration['headers'];
        $this->fields     = $configuration['fields'];
        $this->body       = '';
        $this->styles     = [
            'table' => 'border: solid rgb(128, 128, 128) 1px; width: 600px;',
            'cell'  => [
                'label' => 'text-align: left;
                              padding: 1rem;
                              border: solid rgb(194, 194, 194) 1px;',
                'value'             => 'text-align: left;
                              padding: 1rem;
                              border: solid rgb(194, 194, 194) 1px;
                              background: rgb(231, 231, 231);',
            ],
        ];
        $this->score = $configuration['score'];
    }

    /**
     * Generate markup.
     */

    public function generateMarkup()
    {
        $this->body .= "<table style='{$this->styles['table']}'>";

        foreach ($this->fields as $key => $value) {
            if ($key === "g-recaptcha-response") {
                continue;
            }

            $this->body .= "<tr><td style='{$this->styles['cell']['label']}'>" . ucfirst($key) . ":</td><td style='{$this->styles['cell']['value']}'>{$value}</td></tr>";
        }

        $this->body .= '</table>';
    }

    /**
     * Send the mail.
     */

    public function send()
    {
        $this->generateMarkup();

        if ($this->score <= 0.3) {
            echo '{ "success": false, "message": "Recaptcha failed. Please try again." }';
            exit;
        }

        // Send email.
        $success = mail($this->recipient, $this->subject, $this->body, $this->headers);

        // Response messages.
        if ($success) {
            echo '{ "success": true, "message": "Thanks for your enquiry. I\'ll be in touch with you soon." }';
        } else {
            echo '{ "success": false, "message": "Oops, something went wrong. Please try again." }';
        }
    }
}

/**
 * Configuration.
 *
 * Email recipients, send from addresses, success & error messages.
 */

$recipient = 'me@louisyoung.co.uk';

$subject = 'Test';

$headers = "From: website@louisyoung.co.uk\r\nMIME-Version: 1.0\r\nContent-type: text/html; charset: utf8\r\n";

$token = $fields->{'g-recaptcha-response'};

$recaptcha = new Recaptcha('6LcfxNoUAAAAALqNxmKHcs09J9rb2SieouwC-CNV', $token);

/**
 * Mail configuration array to be passed to 'Mail' object.
 */

$configuration = [
    'recipient' => $recipient,
    'subject'   => $subject,
    'headers'   => $headers,
    'fields'    => $fields,
    'score'     => $recaptcha->score
];

// Instantiate a new instance of the 'Mail' object.
$mail = new Mail($configuration);

// Send the mail.
$mail->send();
