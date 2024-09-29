package main

import (
	"log"
	"net/http"
)
//http://localhost:8080/send_otp


func send_otp(w http.ResponseWriter, r *http.Request) {

}

func main() {
	http.HandleFunc("/send_otp", send_otp)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
