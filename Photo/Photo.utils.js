export const processHashtags = (caption) => {
    const hashtags = caption.match(/#[\w]+/g);
    return hashtags.map((hasgtag)=> ({
        where:{hashtag},
        create:{hashtag}
    }));
}