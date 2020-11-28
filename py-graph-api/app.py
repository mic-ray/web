from flask import Flask
from flask_graphql import GraphQLView
import graphene

app = Flask(__name__)


@app.route("/")
def index():
    return "Hello World!"


class User(graphene.ObjectType):
    username = graphene.String()
    id = graphene.ID()


class Query(graphene.ObjectType):
    users = graphene.List(User)

    def resolve_users(self, info):
        return [User(username="Mike"), User(username="Mikey"), User(username="Mick")]


schema = graphene.Schema(query=Query)

app.add_url_rule(
    "/graphql",
    view_func=GraphQLView.as_view(
        "graphql", schema=schema, graphiql=True  # for having the GraphiQL interface
    ),
)


if __name__ == "__main__":
    app.run(debug=True, port=4000)