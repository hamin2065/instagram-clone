import {gql} from "apollo-server";

export default gql`
    type seeFollowersResult{
        ok: Boolean!
        error: String!
        followers: [User]
        totalPage: Int
    }
    type Query{
        seeFollowers(username:String!,page:Int!):seeFollowersResult!
    }
`;