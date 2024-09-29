// This is the AppState struct that will be used to store the data of the todo items for one user throughout the application.

use std::sync::Mutex;
use crate::models::todo_models::Data;

pub struct AppState {
    pub data: Mutex<Data>
}
