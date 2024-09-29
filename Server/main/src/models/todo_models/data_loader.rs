// This file is responsible for loading data from the database

use crate::models::todo_models::{Data, TodoItem};
use std::error::Error;
use std::fs;

pub fn parse_line(line: String) -> Vec<String> {
    line.split(',')
        .map(|s| s.trim().to_string()) // Trims spaces around each item
        .collect()
}

fn create_data(file_contents: String, data: &mut Data) {
    for content in file_contents.lines() {

        let line            : String        = content.to_string(); // Converted to String
        let err_msg         : &str          = "Could Not Add to TodoItem";
        let parsed_line     : Vec<String>   = parse_line(line);

        data.add_item(TodoItem{
            title       : parsed_line.get(0).expect(&err_msg).to_string(),
            time        : parsed_line.get(1).expect(&err_msg).to_string(),
            date        : parsed_line.get(2).expect(&err_msg).to_string(),
            description : parsed_line.get(3).expect(err_msg).to_string(),
        });
    }
}

pub fn load_data(data: &mut Data) -> Result<(), Box<dyn Error>> {

    let filepath : &str = "./src/database/items.csv";
    match fs::metadata(filepath) {
        Ok(metadata) => {
            if metadata.is_file() {
                let file_contents: String = fs::read_to_string(filepath)?;
                create_data(file_contents, data);
            }
        }
        Err(_) => {
            println!("File does not exist");
            return Ok(());
        }
    }
    Ok(())
}
