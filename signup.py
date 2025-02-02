import sqlite3

def sign_up(user_id, opportunity_id):
    conn = sqlite3.connect("volunteer.db")
    cursor = conn.cursor()
    cursor.execute("INSERT INTO signups (user_id, opportunity_id) VALUES (?, ?)", 
                   (user_id, opportunity_id))
    conn.commit()
    conn.close()

# Example Usage
sign_up(1, 2)  # Alice signs up for "Teach Kids"
sign_up(2, 1)  # Bob signs up for "Beach Cleanup"
