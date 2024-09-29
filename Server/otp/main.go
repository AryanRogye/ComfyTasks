package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/send_otp", sendOTP)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
