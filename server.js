const express = require('express')
const expressGraphQL= require('express-graphql').graphqlHTTP
const schema =require('./schema')


const app =express()

app.use('/__graphql',expressGraphQL({
    schema : schema,
    graphiql: true
})
)

app.listen(4000,()=>{
    console.log('Server running')
})