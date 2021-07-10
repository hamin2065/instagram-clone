import client from "../../client";
import {protectedResolver} from "../../User/User.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, args, {loggedInUser}) => {
                const {file, caption} = args;
                let hashtagObj = [];
                if(caption){
                    const hashtags = caption.match(/#[\w]+/g);
                    hashtagObj = hashtags.map(hashtag => ({
                        where:{hashtag},
                        create:{hashtag}
                    }));
                }
                return client.photo.create({
                    data:{
                        file,
                        caption,
                        user:{
                            connect:{
                                id:loggedInUser.id
                            }
                        },
                        ...(hashtagObj.length > 0 && {hashtags:{connectOrCreate:hashtagObj}})
                    }
                });
            }
        )
    }
};