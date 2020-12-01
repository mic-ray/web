from flask_mongoengine import MongoEngine
from os import environ

db = MongoEngine()


def init_db(app):
    app.config["MONGODB_HOST"] = environ.get("MONGO_URL")
    db.init_app(app)