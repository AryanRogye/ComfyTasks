// This Struct will be used to store the data of the todo items for one user
// TODO : Implement the methods for multiple users

use serde_json::{json, Value};
use crate::models::todo_models::todo_item::TodoItem;
use super::Send;
#[derive(serde::Serialize)]
pub struct Data {
    data : Vec<TodoItem>
}


impl Data {
    pub fn new() -> Self {
        Data { data : Vec::new() }
    }

    #[allow(dead_code)]
    pub fn print_data(&mut self) {
        for i in 0..self.data.len() {
            println!("__________________________________");
            println!("Title:\t{:?}",self.data[i].title);
            println!("Time:\t{:?}", self.data[i].time);
            println!("Date:\t{:?}", self.data[i].date);
            println!("Desc:\t{:?}", self.data[i].description);
            println!("__________________________________");
        }
    }

    pub fn get_items(&self) -> Value {
        let mut send : Send = Send::new();

        for i in 0..self.data.len() {

            send.titles.push(self.data[i].title.clone());
            send.times.push(self.data[i].time.clone());
            send.dates.push(self.data[i].date.clone());
            send.descriptions.push(self.data[i].description.clone());

        }

        let response = json!({
            "titles": send.titles,
            "times": send.times,
            "dates": send.dates,
            "descriptions": send.descriptions
        });
        response
    }

    #[allow(dead_code)]
    pub fn clone(&self) -> Self {
        let mut data : Data = Data::new();
        for i in 0..self.data.len() {
            let todo_item : TodoItem = self.data[i].clone();
            data.data.push(todo_item);
        }
        data
    }

    pub fn add_item(&mut self, data: TodoItem) {
        // The Efficient way I can think of this is to add to TodoItem to the file first
        self.data.push(data);
    }

    #[allow(dead_code)]
    pub fn delete_item(&mut self) {

    }

    #[allow(dead_code)]
    pub fn edit_item(&mut self) {

    }
}
