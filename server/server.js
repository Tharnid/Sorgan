const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const http = require('http');
require('dotenv').config();

// express server
const app = express();

// rest endpoint
app.get('/rest', function(req, res) {
    res.json({
        data: 'you hit the rest endpoint!!!'
    })
});

// port
app.listen(process.env.PORT, function() {
    console.log(`server is ready at http://localhost:${process.env.PORT}`);
});