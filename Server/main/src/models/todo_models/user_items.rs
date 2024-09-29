use serde_json::{json, Value};
use std::error;
use crate::database::database::get_user_items;

#[derive(serde::Deserialize)]
pub struct UserItems {
    pub first_name : String,
    pub last_name  : String,
    pub email      : String,
    pub id         : String
}

impl UserItems {

    pub fn new() -> Self {
        UserItems {
            first_name : "".to_string(),
            last_name  : "".to_string(),
            email      : "".to_string(),
            id         : "".to_string()
        }
    }

    pub fn clone(&self) -> Self {
        UserItems {
            first_name : self.first_name.clone(),
            last_name  : self.last_name.clone(),
            email      : self.email.clone(),
            id         : self.id.clone(),
        }
    }

    pub fn get_first_name(&self) -> &String { &self.first_name }
    pub fn get_last_name(&self) -> &String { &self.last_name }
    pub fn get_email(&self) -> &String { &self.email }
    pub fn get_id(&self) -> &String { &self.id }

    pub fn set_first_name(&mut self, first_name: String) { self.first_name = first_name; }
    pub fn set_last_name(&mut self, last_name: String) { self.last_name = last_name; }
    pub fn set_email(&mut self, email: String) { self.email = email; }
    pub fn set_id(&mut self, id: String) { self.id = id; }

    pub fn get_items(&self) -> Result<Value, Box<dyn error::Error>> {

        // Basically We need to get the items from the database for the corresponding user
        get_user_items(&self);
        Ok(json!({
            "" : ""
        }))

    }

}
