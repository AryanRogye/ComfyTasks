use crate::database::database::{get_info_from_db, check_user_exists};
use crate::models::auth_models::AuthResponse;
use serde_json::{json, Value};
use argon2::{Argon2, password_hash::Error};
use hex;

#[derive(serde::Deserialize)]
pub struct Auth {   // One Users Information
    pub first_name          : String,
    pub last_name           : String,
    pub email               : String,
    pub password            : String,
    pub encrypted_password  : String,
    pub salt                : String,
}

// Define the ErrorHandler trait
pub trait ErrorHandler { fn handle_errors(&self) -> String; }
impl ErrorHandler for Auth {
    fn handle_errors(&self) -> String {
        if self.password.is_empty() { return "Password cannot be empty".to_string(); }

        let check_password_rules = |password : &str| -> String {
            let size            : bool      = password.len() > 6;
            let mut ret         : String    = String::new();
            let mut uppercase   : bool      = false;
            let mut lowercase   : bool      = false;

            // Checking if uppercase or lowercase
            for ch in password.as_bytes() {
                if ch.is_ascii_uppercase() { uppercase = true; }
                if ch.is_ascii_lowercase() { lowercase = true; }
            }

            // If any is true making errors
            if !uppercase   {ret += "Password needs one Capital\n";}
            if !lowercase   {ret += "Password needs one Lowercase\n";}
            if !size        {ret += "Password needs to be longer than 6 characters\n";}

            // If there are errors return them
            if !ret.is_empty() {
                ret = "Please make sure the password has the following:\n".to_string() + &ret;
                return ret;
            } else {
                return "Success".to_string();
            }
        };
        // Check if password is valid and return the error message or success
        let psw = check_password_rules(&self.password);
        if psw != "Success" { return psw; } "Success".to_string()
    }
}

impl Auth {
    pub fn new(first_name : String, last_name : String, email : String, password : String) -> Self {
        Auth {
            first_name : first_name,
            last_name  : last_name,
            email      : email,
            password   : password,
            encrypted_password : "".to_string(),
            salt       : "".to_string(),
        }
    }
    pub fn clone(&self) -> Self {
        Auth {
            first_name          : self.first_name.clone(),
            last_name           : self.last_name.clone(),
            encrypted_password  : self.encrypted_password.clone(),
            password            : self.password.clone(),
            email               : self.email.  clone(),
            salt                : self.salt.clone(),
        }
    }

    async fn encrypt_password(&mut self, salt : String) -> Result<String, Error> {


        // Convert the salt to a byte array
        let salt                    : Vec<u8> = hex::decode(salt).unwrap();
        let password                : &[u8]    = self.password.as_bytes();
        let mut output_key_material : [u8; 32] = [0u8; 32];

        Argon2::default().hash_password_into(password, &salt, &mut output_key_material)?;
        let encrypted_pswd = hex::encode(output_key_material);

        self.password = encrypted_pswd.clone();

        // Now need to check if the password is correct with the database

        Ok(encrypted_pswd)
    }
    pub async fn sign_in(&mut self) -> Value {

        // Handles the basic errors of the password and stores it in the status of the AuthResponse
        let mut auth_response : AuthResponse = AuthResponse::new(self.handle_errors());
        if auth_response.get_status() != "Success" {
            return json!({"status": auth_response.get_status(),});
        }

        // Get a response from the database which contains info about the user
        let mut response = match get_info_from_db(self.clone()).await {
            Ok(response) => response,
            Err(_) => {
                auth_response.set_status("User Does Not Exist".to_string());
                return json!({"status": auth_response.get_status()});
            }
        };
        // Generate the encrypted password based on the users password and the salt
        let gen_psw = match self.encrypt_password(response.get_salt().to_string()).await {
            Ok(gen_psw) => gen_psw,
            Err(_) => {
                auth_response.set_status("Failed to encrypt password".to_string());
                return json!({"status": auth_response.get_status()});
            }
        };
        // Check if the password is correct
        if gen_psw != response.get_encrypted_ps().to_string() {
            auth_response.set_status("Password is incorrect".to_string());
        } else {
            auth_response.set_status("Success".to_string());
        }

        json!({
            "status" : auth_response.get_status(),
            "first_name" : response.get_first_name(),
            "last_name" : response.get_last_name(),
            "email" : response.get_email(),
            "id" : response.get_id(),
        })
    }

    pub fn _sign_out(&mut self) -> &str {
        // Remove the jwt from the database
        // Keep the email   and password in the database
        // Return true if successful
        "Success"
    }

    pub async fn sign_up(&mut self) -> Value {
        // Lower case all the values
        println!("Signing Up");
        self.first_name         = self.first_name.to_lowercase();
        self.last_name          = self.last_name.to_lowercase();
        self.email              = self.email.to_lowercase();

        let mut auth_response : AuthResponse = AuthResponse::new(self.handle_errors());
        if auth_response.get_status() != "Success" {
            return json!({"status": auth_response.get_status(),});
        }

        // Next Thing is to check if the user already exists
        if check_user_exists(self.clone()).await.unwrap() {
            auth_response.set_status("User Already Exists".to_string());
            return json!({"status": auth_response.get_status(),});
        }

        json!({
            "status" : auth_response.get_status(),
        })
    }

    pub fn _is_logged_in(&self) -> bool {
        true
    }
}
