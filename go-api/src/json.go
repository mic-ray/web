package main

import (
	"encoding/json"
	"fmt"
)

// Message represents a received WebSocket message
type Message struct {
	Event   string
	Message string
}

// Decode decodes a given JSON string
func Decode(str []byte) {
	var message Message
	if err := json.Unmarshal(str, &message); err != nil {
		fmt.Println(err)
	}
	fmt.Printf("Received message! Event: %s, Message: %s", message.Event, message.Message)
}
