package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/twilio/twilio-go"
	verify "github.com/twilio/twilio-go/rest/verify/v2"
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func send_message() {
	// Get Twilio credentials from environment variables
	accountSid := os.Getenv("TWILIO_ACCOUNT_SID")
	authToken := os.Getenv("TWILIO_AUTH_TOKEN")
	serviceSid := os.Getenv("TWILIO_SERVICE_SID")

	// Error handling if environment variables are not set
	if accountSid == "" || authToken == "" || serviceSid == "" {
		fmt.Println("Missing Twilio credentials in environment variables")
		return
	}

	// Initialize the Twilio client with your credentials
	client := twilio.NewRestClientWithParams(twilio.ClientParams{
		Username: accountSid,
		Password: authToken,
	})

	// Set the parameters for the verification message
	params := &verify.CreateVerificationParams{}
	params.SetTo("+16304656243") // Replace with the recipient's phone number
	params.SetChannel("sms")     // Set the channel to SMS

	// Send the verification message
	resp, err := client.VerifyV2.CreateVerification(serviceSid, params)
	if err != nil {
		fmt.Println("Error sending OTP:", err.Error())
	} else {
		if resp.Sid != nil {
			fmt.Println("Message sent, SID:", *resp.Sid)
		} else {
			fmt.Println("Failed to send OTP, response SID is nil")
		}
	}
}

// Exported function to handle OTP request
func sendOTP(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		send_message()
		fmt.Fprintf(w, "OTP sent successfully")
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
