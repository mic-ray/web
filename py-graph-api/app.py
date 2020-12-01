from flask import Flask
from data.graphql import init_graphql
from data.db import init_db

app = Flask(__name__)


@app.route("/index")
def index():
    return "Hello World!"


if __name__ == "__main__":
    init_graphql(app)
    init_db(app)
    app.run(debug=True, port=4000)