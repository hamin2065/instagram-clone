import {gql} from "apollo-server";

export default gql`
    type User{
        id: Int!
        firstName: String!
        lastName: String
        email: String!
        password: String!
        createdAt: String!
        updatedAt: String!
    }
    type Mutation{
        creaateAccount(
            firstName:String!
            lastName:String
            username:String!
            email:String!
            password:String!
        ):User!
    }
    type Query{
        seeProfile(usename:String!):User
    }
`;