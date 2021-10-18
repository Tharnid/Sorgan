const {gql} = require('apollo-server-express');

const me  = () => 'Tharnid';

module.exports = {
    Query: {
        me 
    }
};