from flask import Flask, jsonify, request
import psycopg2

app = Flask(__name__)

# PostgreSQL connection details
db_host = '127.0.0.1'
db_port = '5432'
db_name = 'burger_king'
db_user = 'postgres'
db_password = '123'

# Retrieve burgers from the database
def get_burgers():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(
            host=db_host,
            port=db_port,
            database=db_name,
            user=db_user,
            password=db_password
        )

        # Create a cursor object to execute SQL statements
        cursor = conn.cursor()

        # Execute the query to retrieve burgers
        cursor.execute("SELECT name, price FROM burgers")

        # Fetch all the rows from the result set
        rows = cursor.fetchall()

        # Convert the rows to a list of dictionaries
        burgers = []
        for row in rows:
            burger = {"name": row[0], "price": row[1]}
            burgers.append(burger)

        return burgers

    except psycopg2.Error as e:
        print("Error:", str(e))
        return []

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Endpoint to get all burgers
@app.route('/api/burgers', methods=['GET'])
def get_all_burgers():
    burgers = get_burgers()
    return jsonify(burgers)

# Endpoint to add a new burger
@app.route('/api/burgers', methods=['POST'])
def add_burger():
    try:
        # Connect to the PostgreSQL database
        conn = psycopg2.connect(
            host=db_host,
            port=db_port,
            database=db_name,
            user=db_user,
            password=db_password
        )

        # Create a cursor object to execute SQL statements
        cursor = conn.cursor()

        # Retrieve data from the request body
        data = request.get_json()
        name = data['name']
        price = data['price']

        # Execute the query to insert a new burger
        cursor.execute("INSERT INTO burgers (name, price) VALUES (%s, %s)", (name, price))

        # Commit the changes to the database
        conn.commit()

        return jsonify({"message": "Burger added successfully"})

    except (psycopg2.Error, KeyError) as e:
        print("Error:", str(e))
        return jsonify({"error": "Invalid data"}), 400

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if conn:
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)
