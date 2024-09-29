use serde_json::json;
use reqwest::{self, Client};
use actix_web::{get, Responder, HttpResponse};
use std::error::Error;

// For reading .env file
use std::env;
use dotenv::dotenv;


async fn api_req(link : String, code : String) -> Result<reqwest::Response, Box<dyn Error>> {
    let client = Client::new();
    let params = json!({
        "code" : code
    });
    let response = client
        .post(link)
        .json(&params)
        .send()
        .await?;

    Ok(response)
}

#[get("/send_otp")]
pub async fn send_otp() -> impl Responder {

    dotenv().ok();  // This loads the .env file

    // Basically Getting link from .env
    let req_link = env::var("OPT_API_LINK").expect("Error");
    if req_link == "Error " {   // Checking for errors
        return HttpResponse::Ok().body("Invalid Port or Ip");
    }
    // Code that will be sent as a link
    let code : String = "000000".to_string();
    let req: reqwest::Response = api_req(req_link, code).await.expect("Error");  // Then make the request
    let req_text = req.text().await.expect("Error reading response text");
    println!("Response: {}", req_text);

    HttpResponse::Ok().body(req_text)
}
