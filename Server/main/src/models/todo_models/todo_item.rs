// This is the struct that will store an individual todo item

#[derive(Debug, serde::Deserialize, serde::Serialize)]
pub struct TodoItem {
    pub title: String,
    pub time: String,
    pub date: String,
    pub description: String,
}

impl TodoItem {
    #[allow(dead_code)]
    pub fn new() -> Self {
        TodoItem {
            title: String::new(),
            time: String::new(),
            date: String::new(),
            description: String::new(),
        }
    }

    #[allow(dead_code)]
    pub fn clone(&self) -> Self {
        TodoItem {
            title: self.title.clone(),
            time: self.time.clone(),
            date: self.date.clone(),
            description: self.description.clone(),
        }
    }
}

