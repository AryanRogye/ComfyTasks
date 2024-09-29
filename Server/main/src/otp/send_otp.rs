use serde_json::json;
use serde::Deserialize;
use reqwest::{self, Client};
use actix_web::{web, post, Responder, HttpResponse};
use std::error::Error;

// For reading .env file
use std::env;
use dotenv::dotenv;

#[derive(Deserialize)]
struct OTP {
    phone : String,
}


async fn api_req(link : String, code : String, phone : String) -> Result<reqwest::Response, Box<dyn Error>> {
    let client = Client::new();
    let params = json!({
        "phone" : phone,
        "code" : code
    });
    let response = client
        .post(link)
        .json(&params)
        .send()
        .await?;

    Ok(response)
}

#[post("/send_otp")]
pub async fn send_otp(query: web::Json<OTP>) -> impl Responder {

    dotenv().ok();  // This loads the .env file

    // Basically Getting link from .env
    let req_link = env::var("OPT_API_LINK").expect("Error");
    if req_link == "Error " {   // Checking for errors
        return HttpResponse::Ok().body("Invalid Port or Ip");
    }
    // Code that will be sent as a link
    let code : String = "000000".to_string();

    // Phone number to send the OTP to
    let phone = query.phone.clone();

    println!("Phone: {}", phone);

    let req: reqwest::Response = api_req(req_link, code, phone).await.expect("Error");  // Then make the request
    let req_text = req.text().await.expect("Error reading response text");
    println!("Response: {}", req_text);

    HttpResponse::Ok().body(req_text)
}
