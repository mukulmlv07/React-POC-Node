// import { ApolloServer,gql } from "apollo-server";
// import {  ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";

const { ApolloServer,gql } =require("apollo-server") 
const {  ApolloServerPluginLandingPageGraphQLPlayground} =require("apollo-server-core");

// const express = require("express");
// const app = express();
// const port = process.env.port || 4000;


// import { resolvers } from "./resolver.js";
// import { typeDefs } from "./schemagql.js";
// import mongoose from "mongoose";

const {resolvers} =require("./resolver")
const {typeDefs}=require('./schemagql')
const {mongoose}=require("mongoose")

mongoose.connect('mongodb+srv://mukulmalviya:mukul123@cluster0.biwhb.mongodb.net/InfyFolks?retryWrites=true&w=majority' ).then(d=>{
  console.log('successfully connected to db' )
}).catch(err=>{
  console.log(err)
})

const server = new ApolloServer(
  {
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground()]
  }
)


server.listen(4000).then(({url})=>{
  console.log(`Port is running on ${url}`)
})






// const server = new ApolloServer({ typeDefs, resolvers });

