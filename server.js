require('dotenv').config();
import {ApolloServer, gql} from "apollo-server";
import {typeDefs, resolvers} from "./schema"
import { getUser } from "./User/User.utils";
 
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async({req}) => {
        //(request)
        return {
            loggedInUser: await getUser(req.headers.token) //{loggedInUser:{User}}
        }
    }
});

const PORT = process.env.PORT;

server.listen().then(() => console.log(`Server is running on http://localhost:${PORT}/`));

