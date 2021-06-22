import client from "../../client";

export default{
    Query:{
        seeProfile: async(_,args)=>{
            const {username} = args;
            return await client.user.findUnique({
                where:{
                    username
                },
                include:{
                    followers:true,
                    follwing:true
                }
            });
        }
    }
}