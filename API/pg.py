import psycopg2
import json

def insert_burger_data():
    # PostgreSQL connection details
    db_host = '127.0.0.1'
    db_port = '5432'
    db_name = 'burger_king'
    db_user = 'postgres'
    db_password = '123'         
    # JSON data
    json_data = '''
   [
    {
        "name": "Дабл бекон кинг",
        "category": "beef",
        "calories": "500ккал",
        "description": "2 давхар үхрийн мах, бяслаг, бекон",
        "price": "27000₮",
        "image": "../images/double_bacon_kings.webp"
    },

    {
        "name": "Кинг бокс сет",
        "category": "set",
        "calories": "500ккал",
        "description": "2 давхар үхрийн мах, бяслаг, бекон",
        "price": "27000₮",
        "image": "../images/king_boxs.webp"
    },

    {
        "name": "Тендер грилл сет",
        "category": "chicken",
        "calories": "500ккал",
        "description": "2 давхар үхрийн мах, бяслаг, бекон",
        "price": "27000₮",
        "image": "../images/tender_grills.webp"
    },

    {
        "name": "Халапено воппер сет",
        "category": "beef",
        "calories": "500ккал",
        "description": "Үхрийн мах, ногоо",
        "price": "27000₮",
        "image": "../images/halapeno_whopper_sets.webp"
    },

    {
        "name": "Снек бакет",
        "category": "hachir",
        "calories": "500ккал",
        "description": "Чикен Наггетс -15ш, Чикен Фрайс - 15ш, Онион Рингс - 8ш, шарсан төмс бүхий, кетчуптэй багц ",
        "price": "36000₮",
        "image": "../images/snack_buckets.webp"
    },

    {
        "name": "Лонг чикен сет",
        "category": "chicken",
        "calories": "500ккал",
        "description": "Шарсан тахианы мах, гүнжидийн үртэй шинэхэн талхтай бургер, Шарсан төмс /дунд/, ундаа /дунд/",
        "price": "10900₮",
        "image": "../images/long_chicken_sets.webp"
    }
]

'''
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

        # Parse the JSON data
        burger_data = json.loads(json_data)

        # Insert each burger into the burgers table
        for burger in burger_data:
            name = burger['name']
            category = burger['category']
            calories = burger['calories']
            description = burger['description']
            price = burger['price']
            image = burger['image']

            insert_query = "INSERT INTO burgers (name, category, calories, description, price, image) VALUES (%s, %s, %s, %s, %s, %s)"
            values = (name, category, calories, description, price, image)

            cursor.execute(insert_query, values)

        # Commit the changes to the database
        conn.commit()

        print("Burger data inserted successfully.")

    except (psycopg2.Error, json.JSONDecodeError) as e:
        print("Error:", str(e))

    finally:
        # Close the cursor and database connection
        if cursor:
            cursor.close()
        if conn:
            conn.close()

# Call the function to insert the burger data
insert_burger_data()
