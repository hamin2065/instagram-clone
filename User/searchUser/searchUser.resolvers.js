import client from "../../client";

export default {
    Query:{
        searchUser: async(_,args) => {
            return client.user.findMany({
                where:{
                    username:{
                        startsWith:keyword.toLowercase()
                    }
                }
            });
        }
    }
}