import client from "../../client";
import bcrypt from "bcrypt";

export default {
    Mutation:{
        editProfile: async (_,args) => {
            const {
                firstName,
                lastName,
                username,
                email,
                password:newPassword
            } = args;

            let hashedPassword = null;
            if(newPassword){
                hashedPassword = await bcrypt.hash(newPassword,10);
            }
            const updatedUser = await client.user.update({
                where:{
                    id:2
                },
                data:{
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(hashedPassword && {password:hashedPassword})
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
    }
}