import client from "../../client";

export default{
    Query:{
        seeFollowers: async(_,{args}) => {
            const {username, page} = args;
            const check = await client.user.findUnique({
                where: {username},
                select: {id:true},
            });
            if (!check){
                return{
                    ok: false,
                    error: "User not found",
                };
            }
            const followers = await client.user.findUnique({
                where:{
                    username
                }
            }).followers({
                take:5,
                skip:(page-1)*5
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
                totalPage:Math.ceil(totalFollowers/5)
            };
        }
    }
}