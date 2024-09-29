
#[derive(serde::Deserialize)]
pub struct AuthResponse {
    status          : String,
    first_name      : String,
    last_name       : String,
    email           : String,
    encrypted_ps    : String,
    salt            : String,
    id              : String,
}

impl Default for AuthResponse {
    fn default() -> Self {
        AuthResponse {
            status          : String::new(),
            first_name      : String::new(),
            last_name       : String::new(),
            email           : String::new(),
            encrypted_ps    : String::new(),
            salt            : String::new(),
            id              : String::new(),
        }
    }
}

impl AuthResponse {
    pub fn get_status(&self)  -> &String { &self.status  }
    pub fn get_first_name(&mut self)  -> &String { &self.first_name }
    pub fn get_last_name(&mut self) -> &String { &self.last_name }
    pub fn get_email(&mut self) -> &String { &self.email }
    pub fn get_encrypted_ps(&mut self) -> &String { &self.encrypted_ps }
    pub fn get_salt(&mut self) -> &String { &self.salt }
    pub fn get_id(&mut self) -> &String { &self.id }

    pub fn set_status(&mut self, status: String)  { self.status  = status;  }
    pub fn set_first_name(&mut self, first_name : String) { self.first_name = first_name; }
    pub fn set_last_name(&mut self, last_name : String) { self.last_name = last_name; }
    pub fn set_email(&mut self, email : String) { self.email = email; }
    pub fn set_encrypted_ps(&mut self, encrypted_ps : String) { self.encrypted_ps = encrypted_ps; }
    pub fn set_salt(&mut self, salt : String) { self.salt = salt; }
    pub fn set_id(&mut self, id : String) { self.id = id; }


    pub fn new(status: String) -> Self {
        AuthResponse{
            status          : status,
            first_name      : "".to_string(),
            last_name       : "".to_string(),
            email           : "".to_string(),
            encrypted_ps    : "".to_string(),
            salt            : "".to_string(),
            id              : "".to_string(),
        }
    }
}
