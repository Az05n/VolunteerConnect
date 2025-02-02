from http.server import SimpleHTTPRequestHandler, HTTPServer
import json

# Sample data
data = {
    "opportunities": [
        {"id": 1, "title": "Beach Cleanup", "location": "Kochi"},
        {"id": 2, "title": "Teach Kids", "location": "Online"},
        {"id": 3, "title": "Tree Plantation", "location": "Bangalore"}
    ]
}

class VolunteerServer(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/opportunities":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(data["opportunities"]).encode())

server = HTTPServer(("localhost", 5000), VolunteerServer)
print("Server running on http://localhost:5000")
server.serve_forever()
