package main

import (
	"log"
	"net/http"
)

func send_otp(w http.ResponseWriter, r *http.Request) {

}

func main() {
	http.HandleFunc("/send_otp", send_otp)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
