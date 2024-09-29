use actix_web::{App, HttpServer, Responder, HttpResponse, get};
use serde_json::json;
use reqwest::{self, Client};
use dotenv::dotenv;
use std::{env, error::Error};

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
async fn send_otp() -> impl Responder {
    
    // Basically Getting link from .env
    let req_link = env::var("OPT_API_LINK").expect("Error");
    if req_link == "Error " {   // Checking for errors
        return HttpResponse::Ok().body("Invalid Port or Ip");
    }
    // Code that will be sent as a link
    let code : String = "000000".to_string();
    let req : reqwest::Response = api_req(req_link, code).await.expect("Error");  // Then make the request
    HttpResponse::Ok().body("Hello world!")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();  // This loads the .env file


    println!("___________________________");
    println!("      STARTING SERVER");
    println!("___________________________");

    HttpServer::new(move || {
        App::new()
            .service(send_otp)
    })
    // Link is http://localhost:8080
    // .bind(("0.0.0.0", 8080))? // When in university
    // .bind(("172.20.10.3", 8080))?
    // .bind(("10.0.0.80", 8080))?  // When at home
    .bind(("0.0.0.0", 8078))?
    // .bind(("127.0.0.1", 8080))?
    .run()
    .await
}
