// OTP Server
mod otp;
use crate::otp::send_otp::send_otp;

mod auth;
use crate::auth::sign_in::sign_in;

mod models;
mod database;

use actix_web::{App, HttpServer};


#[actix_web::main]
async fn main() -> std::io::Result<()> {


    println!("___________________________");
    println!("      STARTING SERVER");
    println!("___________________________");

    HttpServer::new(move || {
        App::new()
            .service(sign_in)
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
