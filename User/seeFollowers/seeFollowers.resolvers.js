import client from "../../client";

export default{
    Query:{
        seeFollowers: async(_,{args}) => {
            const {username, page} = args;
            const followers = await client.user.findUnique({
                where:{
                    username
                }
            }).followers({
                take:5,
                skip:(page-1)+5
            });
            const totalFollowers = await client.user.count({
                where:{
                    followers:{
                        some:{
                            username
                        }
                    }
                }
            });
            return{
                ok:true,
                followers,
                totalFollowers:Math.ceil(totalFollowers/5)
            };
        }
    }
}