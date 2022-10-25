import axios, { AxiosInstance, AxiosResponse } from "axios";

import { REQUEST_ITEMS, REQUEST_URL, REQUEST_TIMEOUT } from "./constants";
import { IComment } from "./types/IComment";
import { IArticle } from "./types/IArticle";

export const api: AxiosInstance = axios.create({
    baseURL: REQUEST_URL,
    timeout: REQUEST_TIMEOUT,
});

export const getArticles = async () => {
    const storiesIdsResponse = await api.get("/newstories.json?print=pretty");
    const ids = storiesIdsResponse.data.slice(0, REQUEST_ITEMS);
    const itemsResponse = await Promise.all(ids.map((it: number) => api.get(`item/${it}.json?print=pretty`)));
    const articles = itemsResponse.slice().map((it: AxiosResponse) => it.data);
    
    return articles;
};

export const getItem = async (id: number) => {
    const { data: itemResponse } = await api.get(`item/${id}.json?print=pretty`);
    
    return itemResponse;
};

const getComments = async (ids: number[]) => {
    const comments = await Promise.all(ids.map((it: number) => getItem(it)));
    
    return comments;
};

export const getCommentsTree = async (article: IArticle) => {
    const comments: IComment[] = [];

    if (!article.kids) {
        return comments;
    } else {
        const commentsIds = article.kids;
        const commentsChild = await getComments(commentsIds);
        commentsChild.forEach(async it => {
            const subChildTree = await diveDeep(it);

            comments.push(subChildTree);
        });
    }

    return comments;
};

const diveDeep = async (comment: IComment) => {
    const result: IComment = { ...comment };

    if (result.kids) {
        const kids = result.kids;
        const tmp: IComment[] = [];
        
        kids.forEach(async (it: any) => {
            const comment = await getItem(it);
            const newComment = await diveDeep(comment);

            tmp.push(newComment);
        });
        
        result.kids = tmp;

        return result;
    } else {
        return result;
    }
};