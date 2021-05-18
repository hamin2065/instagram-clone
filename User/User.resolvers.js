import client from "../client";
import bcrypt from "bcrypt";

export default{
    Mutation:{
        createAccount: async (_,args) => {
            const {
                firstName,
                lastName,
                username,
                email,
                password
            } = args;
            
            try{
                const existingUser = await client.user.findFirst({
                    where:{
                        OR:[
                            {username},
                            {email}
                        ]
                    }
                });
                if(existingUser){
                    throw new Error("이미 존재하는 사용자입니다!")
                }
                const uglyPassword =  await bcrypt.hash(password,10);
                return client.user.create({
                    data:{
                        username,
                        email,
                        lastName,
                        firstName,
                        password:uglyPassword
                    }
                });
                // username or email을 가지고 있는 사용자가 있는지
                // hash password
                // save user and return User
            }catch(e){
                return e;
            }
        }
    },
    Query:{
        seeProfile: async(_,args) =>{
            //변수(username) 받은거
            /* username find
                
            */
        }
    }
}