import client from "../../client";
import bcrypt from "bcrypt";
import {protectedResolver} from "../User.utils";

export default {
    Mutation:{
        //함수를 작동하려는 사람이 로그인된 유저가 맞는지(본인이 맞는지) -> 보안! -> 인증(Authentication)
        // playgroudnd(=client) -- request -- Back server -- response --> client HTTP(Header(JWT Token)<-데이터 이외, Body<-데이터)
        // resolver(root, args, context, info)
        editProfile: protectedResolver(async (_,args,{loggedInUser}) => {
            //{loggedInUser:{User}} == return ==> User
            const {
                firstName,
                lastName,
                username,
                email,
                bio,
                avatar,
                password:newPassword
            } = args;
            
            let hashedPassword = null;
            if(newPassword){
                hashedPassword = await bcrypt.hash(newPassword,10);
            }
            const updatedUser = await client.user.update({
                where:{
                    id:loggedInUser.id
                },
                data:{
                    firstName,
                    lastName,
                    username,
                    email,
                    bio,
                    avatar,
                    ...(hashedPassword && {password:hashedPassword}),
                }
                //...(a && {b}) ==> b
                // a != null 
            });
            if(updatedUser.id){
                return {
                    ok:true
                }
            }
            else {
                return {
                    ok:false,
                    error:"업데이트 실패!"
                }
            }
        }

        )
    }
}