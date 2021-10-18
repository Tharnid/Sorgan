const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const http = require('http');
require('dotenv').config();
const path = require('path');
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
 

// express server
const app = express();

// typeDefs

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs"))); 

// resolvers

const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")));

// APollo Server

let apolloServer = null;

async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app });
}

startServer();

// server

const httpserver = http.createServer(app)

// rest endpoint /graphql (default)
app.get('/rest', function(req, res) {
    res.json({
        data: 'you hit the rest endpoint!!!'
    })
});

// port
app.listen(process.env.PORT, function() {
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
    console.log(`graphql server is ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath}`);
});