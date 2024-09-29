package main

import (
	"log"
	"fmt"
	"net/http"
)

func send_otp(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		fmt.Fprintf(w, "Hello from Go")
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

func main() {
	http.HandleFunc("/send_otp", send_otp)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
