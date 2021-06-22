import client from "../client";

export default {
    User: {
        totalFollowing: ({id}) => client.user.count({
            where:{
                followers:{
                    some:{
                        id
                    }
                }
            }
        }),
        totalFollowers: ({id}) => client.user.count({
            where:{
                followers:{
                    some:{
                        id
                    }
                }
            }
        }),
        isMe: ({id},_,{loggedInUser}) => {
            if(!loggedInUser){
                return false
            }
            const exist = await client.user.count({
                where:{
                    username:loggedInUser.username,
                    following:{
                        some:{
                            id
                        }
                    }
                }
            });
            return Boolean(exist)
        }
    }
}