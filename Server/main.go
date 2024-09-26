package main

import (
	"fmt"
	"net/http"
)

// Check If The method is POST
func check_post_method(w http.ResponseWriter, r *http.Request) bool {
	if r.Method != http.MethodPost {
		w.WriteHeader(http.StatusMethodNotAllowed)
		fmt.Fprintf(w, "Method not allowed. Only POST requests are allowed.")
		return false
	}
	return true
}

/*
 *  w : This is where you send your response (for example, writing back "Hello").
 *  r : This is where you get your request (for example, reading the URL path).
 */

// POST - SignIn
func sign_in_handler(w http.ResponseWriter, r *http.Request) {
	if !check_post_method(w, r) {
		return
	}
	fmt.Fprintf(w, "You have requested the /sign_in page")
}

// POST - SignUp
func sign_up_handler(w http.ResponseWriter, r *http.Request) {
	if !check_post_method(w, r) {
		return
	}
	fmt.Fprintf(w, "You have requested the /sign_up page")
}

func main() {
	fmt.Println("Starting server")

	http.Handle("/phone_number_sign_in", http.HandlerFunc(sign_in_handler))
	http.Handle("/phone_number_sign_up", http.HandlerFunc(sign_up_handler))

	http.ListenAndServe(":8080", nil)
}
