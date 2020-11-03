package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
}

func get(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"result": "GET method called"}`))
}

func reader(conn *websocket.Conn) {
	// Always listen for messages from client
	for {
		messageType, p, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// Print received message
		log.Println(string(p))

		// Echo back the received message
		if err := conn.WriteMessage(messageType, p); err != nil {
			log.Println(err)
			return
		}

	}
}

func wsEndpoint(w http.ResponseWriter, r *http.Request) {
	// Always allow client to upgrade independent of origin
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	// Upgrade to websocket connection
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
	}

	log.Println("Client Connected")

	// Greet client
	err = ws.WriteMessage(1, []byte("Hi Client!"))
	if err != nil {
		log.Println(err)
	}

	// Listen for client messages
	reader(ws)

}

// Setup routes
func setupRoutes(router *mux.Router) {
	router.HandleFunc("/", get).Methods(http.MethodGet)
	router.HandleFunc("/ws", wsEndpoint)
}

func main() {
	router := mux.NewRouter()
	setupRoutes(router)
	log.Fatal(http.ListenAndServe(":8080", router))
}
