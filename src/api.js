import axios from "axios";

const api = axios.create({
    baseURL: `https://hacker-news.firebaseio.com/v0/`,
    timeout: 10000
});

const getArticles = async () => {
    const storiesIdsResponse = await api.get(`/newstories.json?print=pretty`);
    const ids = storiesIdsResponse.data.slice(0, 100);
    const itemsResponse = await Promise.all(ids.map((it) => api.get(`item/${it}.json?print=pretty`)));
    const articles = itemsResponse.slice().map((it) => it.data);
    
    return articles;
};

const getItem = async (id) => {
    const {data: itemResponse} = await api.get(`item/${id}.json?print=pretty`);
    
    return itemResponse;
};

const getComments = async (ids) => {
    const comments = await Promise.all(ids.map((it) => getItem(it)));
    
    return comments;
};

const getCommentsTree = async (article) => {
    const comments = [];

    if (!article.hasOwnProperty(`kids`)) {
        return comments;
    } else {
        const commentsIds = article.kids;
        const commentsChild = await getComments(commentsIds);
        commentsChild.forEach(async (it) => {
            const subChildTree = await diveDeep(it);

            comments.push(subChildTree);
        });
    }
    
    return comments;
};

const diveDeep = async (comment) => {
    const result = Object.assign({}, comment);

    if (result.hasOwnProperty(`kids`)) {
        const kids = result.kids;
        const tmp = [];
        
        kids.forEach(async (it) => {
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

export {
    api,
    getArticles,
    getCommentsTree,
    getItem
};