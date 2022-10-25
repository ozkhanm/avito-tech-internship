import { IArticle } from "../types/IArticle";
import { IComment } from "../types/IComment";

export const ActionType = {
    GET_ARTICLES: "GET_ARTICLES",
    CHANGE_LOADING_STATUS: "CHANGE_LOADING_STATUS",
    CHANGE_ACTIVE_ARTICLE_ID: "CHANGE_ACTIVE_ARTICLE_ID",
    GET_ARTICLE_COMMENTS: "GET_ARTICLE_COMMENTS",
    CHANGE_COMMENTS_LOADING_STATUS: "CHANGE_COMMENTS_LOADING_STATUS",
    SET_ACTIVE_ARTICLE: "SET_ACTIVE_ARTICLE",
    CHANGE_ACTIVE_ARTICLE_LOADING_STATUS: "CHANGE_ACTIVE_ARTICLE_LOADING_STATUS",
    DROP_ACTIVE_ARTICLE: "DROP_ACTIVE_ARTICLE",
    CHANGE_REFRESH_STATUS: "CHANGE_REFRESH_STATUS",
    SET_ERROR_MESSAGE: "SET_ERROR_MESSAGE",
};

export const ActionCreator = {
    getArticles: (articles: IArticle[]) => ({
        type: ActionType.GET_ARTICLES,
        payload: articles,
    }),
    changeLoadingStatus: (status: boolean) => ({
        type: ActionType.CHANGE_LOADING_STATUS,
        payload: status,
    }),
    changeActiveArticleId: (id: number) => ({
        type: ActionType.CHANGE_ACTIVE_ARTICLE_ID,
        payload: id,
    }),
    getArticleComments: (comments: IComment[]) => ({
        type: ActionType.GET_ARTICLE_COMMENTS,
        payload: comments,
    }),
    changeCommentsLoadingStatus: (status: boolean) => ({
        type: ActionType.CHANGE_COMMENTS_LOADING_STATUS,
        payload: status,
    }),
    setActiveArticle: (article: IArticle | -1) => ({
        type: ActionType.SET_ACTIVE_ARTICLE,
        payload: article,
    }),
    changeActiveArticleLoadingStatus: (status: boolean) => ({
        type: ActionType.CHANGE_ACTIVE_ARTICLE_LOADING_STATUS,
        payload: status,
    }),
    dropActiveArticle: () => ({
        type: ActionType.DROP_ACTIVE_ARTICLE,
    }),
    changeRefreshStatus: (status: boolean) => ({
        type: ActionType.CHANGE_REFRESH_STATUS,
        payload: status,
    }),
    setErrorMessage: (message: string) => ({
        type: ActionType.SET_ERROR_MESSAGE,
        payload: message,
    }),
};