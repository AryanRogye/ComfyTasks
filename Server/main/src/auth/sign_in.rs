use actix_web::{web, post, Responder, HttpResponse};
use serde::Deserialize;
use crate::models::auth_models::Auth;
use std::time::SystemTime;
use chrono::{DateTime, Local};


// This is the struct that will be sent to this endpoint
#[derive(Deserialize)]
struct SignInCreds {
    first_name  : String,
    last_name   : String,
    email       : String,
    password    : String,
}

#[post("/sign_in")]
pub async fn sign_in(query: web::Json<SignInCreds>) -> impl Responder {
    // The Query will send back a email and a password
    // We will check if the email and password are correct
    // First by handling the errors of the password

    // Crete a Auth Instance
    let auth = Auth::new(
        query.first_name.clone(),
        query.last_name.clone(),
        query.email.clone(),
        query.password.clone()
    );
    let start = SystemTime::now();
    let datetime: DateTime<Local> = start.into();
    println!("Sign In Checked at {}", datetime.format("%I:%M:%S %p"));
    HttpResponse::Ok().json(auth.clone().sign_in().await)
}
