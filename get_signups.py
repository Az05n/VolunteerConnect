import sqlite3

def get_user_signups(user_id):
    conn = sqlite3.connect("volunteer.db")
    cursor = conn.cursor()
    cursor.execute("SELECT opportunity_id FROM signups WHERE user_id = ?", (user_id,))
    signups = cursor.fetchall()
    conn.close()
    return signups

# Example Usage
print(get_user_signups(1))  # Fetch Alice's signed-up opportunities
