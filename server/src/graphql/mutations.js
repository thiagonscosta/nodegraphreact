const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLID
} = require('graphql');
const BookModel = require('../app/models/Book');
const {
    BookType
} = require('./types');


const RootMutation = new GraphQLObjectType({
    name: 'RootMutation',
    type: 'Mutation',
    fields: function () {
        return {
            addBook: {
                type: BookType,
                args: {
                    isbn: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    author: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    published_year: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    publisher: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const bookModel = new BookModel(params);
                    const newBook = bookModel.save();
                    if (!newBook) {
                        throw new Error('Error');
                    }
                    return newBook;
                }
            },
            updateBook: {
                type: BookType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    isbn: {
                        name: 'isbn',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    title: {
                        name: 'title',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    author: {
                        name: 'author',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    description: {
                        name: 'description',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    published_year: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    publisher: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    return BookModel.findByIdAndUpdate(params.id, {
                        isbn: params.isbn,
                        title: params.title,
                        author: params.author,
                        description: params.description,
                        published_year: params.published_year,
                        publisher: params.publisher,
                        // updated_date: new Date()
                    }, function (err) {
                        if (err) {
                            return next(err);
                        }
                    })
                }
            },
            removeBook: {
                type: BookType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remBook = BookModel.findByIdAndRemove(params.id).exec();
                    if (!remBook) {
                        throw new Error('Error')
                    }
                    return remBook;
                }
            }
        }
    }
});

exports.mutation = RootMutation;