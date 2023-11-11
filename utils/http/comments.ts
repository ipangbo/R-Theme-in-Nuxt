import {type CommentSent } from "~/types/CommentTypes";

export const sendComment = async (body: CommentSent): Promise<any> => {
    const { data: postData } = await useAPIFetch(`/comments`, {
        method: 'POST',
        body,
    });

    return postData.value;
}

