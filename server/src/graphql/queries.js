const { 
    GraphQLObjectType, 
    GraphQLList,
    GraphQLString,
    GraphQLID 
} = require('graphql');
const BookModel = require('../app/models/Book');
const { BookType } = require('./types');

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    type: 'Query',
    fields: function () {
        return {
            books: {
                type: new GraphQLList(BookType),
                resolve: function () {
                    const books = BookModel.find().exec();
                    if (!books) {
                        throw new Error('Error');
                    }
                    return books;
                }
            },
            book: {
                type: BookType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const bookDetails = BookModel.findById(params.id)
                    if (!bookDetails) {
                        throw new Error('Error');
                    }
                    return bookDetails;
                }
            }
        }
    }
});

exports.query = RootQuery;