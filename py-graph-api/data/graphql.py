from flask_graphql import GraphQLView
import graphene


class User(graphene.ObjectType):
    username = graphene.String()
    id = graphene.ID()


class Query(graphene.ObjectType):
    users = graphene.List(User)

    def resolve_users(self, info):
        return [User(username="Mike"), User(username="Mikey"), User(username="Mick")]


schema = graphene.Schema(query=Query)


def init_graphql(app):
    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view(
            "graphql", schema=schema, graphiql=True  # for having the GraphiQL interface
        ),
    )
