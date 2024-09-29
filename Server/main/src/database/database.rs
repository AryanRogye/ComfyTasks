use crate::models::{auth_models::{Auth, AuthResponse}, todo_models::UserItems};
use std::error;
use dotenv::dotenv;
use serde_json::Value;
use std::env;
use tokio_postgres::{self, Client};

pub fn get_connection() -> String {
    dotenv().ok();
    let username : String = env::var("DB_USERNAME").expect("DB_USERNAME must be set");
    let password : String = env::var("DB_PASSWORD").expect("DB_PASSWORD must be set");
    let dbname   : String = env::var("DB_NAME").expect("DB_NAME must be set");
    let ip       : String = env::var("DB_HOST").expect("DB_HOST must be set");
    let port     : String = env::var("DB_PORT").expect("DB_PORT must be set");
    let connection = format!(
        "host={} port={} user={} password={} dbname={}",
        ip, port, username, password, dbname
    );
    connection
}

pub async fn connect() -> Result<tokio_postgres::Client, Box<dyn error::Error>> {
    // Attempt to connect to the PostgreSQL database using the connection string
    let (client, connection) = tokio_postgres::connect(
        get_connection().as_str(),
        tokio_postgres::NoTls
    ).await?;

    // Spawn the connection on a separate task
    tokio::spawn(async move {
        if let Err(e) = connection.await {
            eprintln!("Connection error: {}", e);
        }
    });
    Ok(client)
}

pub async fn get_info_from_db(auth: Auth) -> Result<AuthResponse, Box<dyn error::Error>> {
    let client = connect().await?;
    // Query the database for the user's encrypted password
    let row = client
        .query_one("SELECT * FROM users WHERE email = $1", &[&auth.email])
        .await?;

    let (first_name, last_name, email, encrypted_ps, salt, id): (String, String, String, String, String, i32) = (
        row.get("firstname"),
        row.get("lastname"),
        row.get("email"),
        row.get("encrypted_ps"),
        row.get("salt"),
        row.get("id"),
    );

    // Initialize AuthResponse based on the data fetched
    let mut response = AuthResponse::new("Success".to_string());
    response.set_first_name(first_name);
    response.set_last_name(last_name);
    response.set_email(email);
    response.set_encrypted_ps(encrypted_ps);
    response.set_salt(salt);
    response.set_id(id.to_string());
    Ok(response)
}

pub async fn check_user_exists(auth: Auth) -> Result<bool, Box<dyn error::Error>> {
    let client : Client = connect().await?;
    let row = client
        .query_opt(
            "SELECT 1 FROM users WHERE firstname = $1 AND lastname = $2 AND email = $3",
            &[&auth.first_name, &auth.last_name, &auth.email],
        ).await?;

    let count: i32 = row.expect(" There was an error").get(0);
    if count > 0 {  // If the user exists
        return Ok(true)
    }
    Ok(false)
}

pub async fn get_user_items( user: &UserItems) -> Result<Vec<String>, Box<dyn error::Error>> {

    let client = connect().await?;
    let row = client
        .query_one(
            "SELECT tasks FROM users WHERE firstname = $1 AND lastname = $2 AND email = $3 AND id = $4",
            &[&user.first_name, &user.last_name, &user.email, &user.id],  // Added &user.id
        ).await?;

    // So For now each task will have a task and status for now
    let tasks_str: &str = row.get("tasks");
    let tasks: Value = serde_json::from_str(tasks_str)?;
    println!("Tasks: {}", tasks);

    Ok(vec!["".to_string()])
}
