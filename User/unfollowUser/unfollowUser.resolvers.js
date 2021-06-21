import client from "../../client";
import { protectedResolver } from "../User.utils";

export default {
    Mutation: {
        followUser:protectedResolver(async(_,args,{loggedInUser}) =>{
            const {username} = args;
            const check = await client.user.findUnique({
                where:{
                    username
                }
            });//follow할 유저가 존재하는지 확인
            if(!check){
                return{
                    ok:false,
                    error:"사용자가 존재하지 않습니다."
                }
            }//follow할 유저가 존재하지 않는 경우
            await client.user.update({
                where:{
                    id:loggedInUser.id
                },
                data:{
                    following:{
                        disconnect:{
                            username
                        }
                    }
                }
            });
            return{
                ok: true
            }
        })
    }
}