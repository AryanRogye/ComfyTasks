// This is the struct that will be sent to the client

pub struct Send {
    pub titles: Vec<String>,
    pub times: Vec<String>,
    pub dates: Vec<String>,
    pub descriptions: Vec<String>,
}

impl Send {
    pub fn new() -> Self {
        Send {
            titles: Vec::new(),
            times: Vec::new(),
            dates: Vec::new(),
            descriptions: Vec::new(),
        }
    }
}
