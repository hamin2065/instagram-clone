import {gql} from "apollo-server";

export default gql`
    type Query{
        searchPhoto(keyword:String!):[Photo]
    }
`;