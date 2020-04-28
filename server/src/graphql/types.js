const graphql = require("graphql");
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    type: 'Query',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            isbn: {
                type: GraphQLString
            },
            title: {
                type: GraphQLString
            },
            author: {
                type: GraphQLString
            },
            description: {
                type: GraphQLString
            },
            published_year: {
                type: GraphQLInt
            },
            publisher: {
                type: GraphQLString
            },
            // updated_date: {
            //     type: GraphQLDate
            // },
        }
    }
});

exports.BookType = BookType;