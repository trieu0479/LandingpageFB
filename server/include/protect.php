<?php 
class protect{
    private $key = "v3xLy2KOcYf7zuR";
    function encrypt($data) {
        $encryption_key = base64_decode($this->key);
        $iv = openssl_random_pseudo_bytes(openssl_cipher_iv_length('aes-256-cbc'));
        $encrypted = openssl_encrypt($data, 'aes-256-cbc', $encryption_key, 0, $iv);
        $data = base64_encode($encrypted . '::' . $iv);
        return $data = str_replace(array('+','/','='),array('-','_',''),$data);

    }

    function decrypt($data) {
        $data = str_replace(array('-','_'),array('+','/'),$data);
        $encryption_key = base64_decode($this->key);
        list($encrypted_data, $iv) = explode('::', base64_decode($data), 2);
        return @openssl_decrypt($encrypted_data, 'aes-256-cbc', $encryption_key, 0, $iv);
    }

    function encrypt_decrypt($action, $string) {
        $output = false;
        $encrypt_method = "AES-256-CBC";
        $secret_key = 'EADSadafadafoies324221313';
        $secret_iv = 'dADDSadsfna111dlsfmnxczasidfn23';
        // hash
        $key = hash('sha256', $secret_key);
        
        // iv - encrypt method AES-256-CBC expects 16 bytes - else you will get a warning
        $iv = substr(hash('sha256', $secret_iv), 0, 16);
        if ( $action == 'encrypt' ) {
            $output = openssl_encrypt($string, $encrypt_method, $key, 0, $iv);
            $output = "v6".base64_encode($output);
  
        } else if( $action == 'decrypt' ) {
            $string = substr($string,2);
            $output = openssl_decrypt(base64_decode($string), $encrypt_method, $key, 0, $iv);
        }
        return $output;
    } 
}