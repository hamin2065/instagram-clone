import {gql} from "apollo-server";

export default gql`
    type SeeFollowingResult{
        ok: Boolean!
        error: String
        followers: [User]
    }
    type Query{
        seeFollowing(username:String!,lastId:Int):seeFollowingResult!
    }
`;