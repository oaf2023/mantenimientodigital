from decouple import config

MYSQL_USER = config("MYSQL_USER", default="oaf")
MYSQL_PASSWORD = config("MYSQL_PASSWORD", default="familia2024")
MYSQL_HOST = config("MYSQL_HOST", default="oaf.mysql.pythonanywhere-services.com")
MYSQL_DB = config("MYSQL_DB", default="mantenimientodigital")

DATABASE_URL = f"mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}"