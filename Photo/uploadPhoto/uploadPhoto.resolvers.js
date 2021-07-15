import client from "../../client";
import {protectedResolver} from "../../User/User.utils";
import { processHashtags } from "../Photo.utils";

export default {
    Mutation: {
        uploadPhoto: protectedResolver(
            async (_, args, {loggedInUser}) => {
                const {file, caption} = args;
                let hashtagObj = [];
                if(caption){
                    hashtagObj = processHashtags(caption);
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