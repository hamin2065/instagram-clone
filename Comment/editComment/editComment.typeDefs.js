import {gql} from  "apollo-server";

export default gql`
    type editCommentResult{
        ok:Boolean!
        error:String
    }
    type Mutation{
        editComment(id:Int!, payload:String!):editCommentResult!
    }
`;