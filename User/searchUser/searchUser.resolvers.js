import client from "../../client";

export default {
    Query:{
        searchUser: async(_,args) => {
            const{keyword} = args;
            return client.user.findMany({
                where:{
                    username:{
                        startsWith:keyword.toLowerCase()
                    }
                }
            });
        }
    }
}
//keyword가 포함되는 아이디를 찾으려면 어떻게해야하는지 공식 docu로 알아보기