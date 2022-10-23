const ActionType = {
    GET_ARTICLES: `GET_ARTICLES`,
    CHANGE_LOADING_STATUS: `CHANGE_LOADING_STATUS`,
    CHANGE_ACTIVE_ARTICLE_ID: `CHANGE_ACTIVE_ARTICLE_ID`,
    GET_ARTICLE_COMMENTS: `GET_ARTICLE_COMMENTS`,
    CHANGE_COMMENTS_LOADING_STATUS: `CHANGE_COMMENTS_LOADING_STATUS`,
    GET_ACTIVE_ARTICLE: `GET_ACTIVE_ARTICLE`,
    CHANGE_ACTIVE_ARTICLE_LOADING_STATUS: `CHANGE_ACTIVE_ARTICLE_LOADING_STATUS`,
    DROP_ACTIVE_ARTICLE: `DROP_ACTIVE_ARTICLE`,
    CHANGE_REFRESH_STATUS: `CHANGE_REFRESH_STATUS`
};

const ActionCreator = {
    getArticles: (articles) => ({
        type: ActionType.GET_ARTICLES,
        payload: articles
    }),
    changeLoadingStatus: (status) => ({
        type: ActionType.CHANGE_LOADING_STATUS,
        payload: status
    }),
    changeActiveArticleId: (id) => ({
        type: ActionType.CHANGE_ACTIVE_ARTICLE_ID,
        payload: id
    }),
    getArticleComments: (comments) => ({
        type: ActionType.GET_ARTICLE_COMMENTS,
        payload: comments
    }),
    changeCommentsLoadingStatus: (status) => ({
        type: ActionType.CHANGE_COMMENTS_LOADING_STATUS,
        payload: status
    }),
    getActiveArticle: (article) => ({
        type: ActionType.GET_ACTIVE_ARTICLE,
        payload: article
    }),
    changeActiveArticleLoadingStatus: (status) => ({
        type: ActionType.CHANGE_ACTIVE_ARTICLE_LOADING_STATUS,
        payload: status
    }),
    dropActiveArticle: () => ({
        type: ActionType.DROP_ACTIVE_ARTICLE
    }),
    changeRefreshStatus: (status) => ({
        type: ActionType.CHANGE_REFRESH_STATUS,
        payload: status
    })
};

export {ActionCreator, ActionType};