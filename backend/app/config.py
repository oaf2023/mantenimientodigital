from decouple import config

MYSQL_USER = config("MYSQL_USER", default="your_pythonanywhere_username")
MYSQL_PASSWORD = config("MYSQL_PASSWORD", default="your_database_password")
MYSQL_HOST = config("MYSQL_HOST", default="your_pythonanywhere_username.mysql.pythonanywhere-services.com")
MYSQL_DB = config("MYSQL_DB", default="your_pythonanywhere_username$default")

DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"