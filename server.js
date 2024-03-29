require('dotenv').config();
import http from "http";
import express from "express";
import logger from "morgan";
import {ApolloServer} from "apollo-server-express";
import {typeDefs, resolvers} from "./schema";
import { getUser } from "./User/User.utils";


const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async(ctx) => {
        if(ctx.req){
            return {
                loggedInUser: await getUser(ctx.req.headers.token) //{loggedInUser:{User}}
            }
        }else{
            const{
                connection:{context}
            } = ctx;
            return{
                loggedInUser: context.loggedInUser
            }
        }
        
    },
    subscriptions:{
        onConnect:async({token}) => {
            if(!token){
                throw new Error("You can't Listen")
            }
            const loggedInUser = await getUser(token);
            return{
                loggedInUser
            }
        }
    }
});

const PORT = process.env.PORT;

//순서 중요!
const app = express();
apollo.installSubscriptionHandlers(app);
app.use(logger("tiny"));

apollo.applyMiddleware({app});
app.use("/static",express.static("uploads"));

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

app.listen(
    {port:PORT},
    () =>{
        console.log(`Server is running on http://localhost:${PORT}/graphql`)
    }
); 
