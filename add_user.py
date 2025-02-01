import sqlite3

def add_user(name, skills, availability):
    conn = sqlite3.connect("volunteer.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO users (name, skills, availability) VALUES (?, ?, ?)", 
                   (name, skills, availability))
    conn.commit()
    conn.close()

# Example Usage
add_user("Alice", "Teaching, Coding", "Weekends")
add_user("Bob", "Event Management", "Evenings")
