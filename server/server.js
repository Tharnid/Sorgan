const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const http = require('http');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const { makeExecutableSchema } = require("graphql-tools");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const { truncate } = require('fs');
 

// express server
const app = express();

// db

const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE_CLOUD, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        });
        
        console.log('DB Connected!!!');
        
    } catch (error) {
        console.log('DB connection Error!!!', error);
    }
};

// execute database connection
db();

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