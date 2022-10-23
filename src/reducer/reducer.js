import initialState from "./initial-state";
import {ActionType, ActionCreator} from "./action-creator";
import {getArticles, getCommentsTree, getItem} from "../api";

const Operation = {
    getArticles: () => async (dispatch) => {
        const articles = await getArticles();

        dispatch(ActionCreator.getArticles(articles));
        dispatch(ActionCreator.changeLoadingStatus(true));
    },
    getActiveArticle: (articleId) => async (dispatch) => {
        const article = await getItem(articleId);
    
        if (article !== null) {
            const comments = await getCommentsTree(article);

            dispatch(ActionCreator.getActiveArticle(article));
            dispatch(ActionCreator.getArticleComments(comments));
            dispatch(ActionCreator.changeActiveArticleLoadingStatus(true));
            dispatch(ActionCreator.changeCommentsLoadingStatus(true));
        } else {
            dispatch(ActionCreator.getActiveArticle(-1));
        }
    }
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionType.CHANGE_LOADING_STATUS:
            return Object.assign({}, state, {
                isDataLoaded: action.payload
            });

        case ActionType.GET_ARTICLES:
            return Object.assign({}, state, {
                articles: action.payload
            });

        case ActionType.CHANGE_ACTIVE_ARTICLE_ID:
            return Object.assign({}, state, {
                activeArticleId: action.payload
            });

        case ActionType.GET_ARTICLE_COMMENTS:
            return Object.assign({}, state, {
                articleComments: action.payload
            });

        case ActionType.CHANGE_COMMENTS_LOADING_STATUS:
            return Object.assign({}, state, {
                isCommentLoaded: action.payload
            });

        case ActionType.GET_ACTIVE_ARTICLE:
            return Object.assign({}, state, {
                activeArticle: action.payload
            });

        case ActionType.CHANGE_ACTIVE_ARTICLE_LOADING_STATUS:
            return Object.assign({}, state, {
                isActiveArticleLoaded: action.payload
            });

        case ActionType.DROP_ACTIVE_ARTICLE:
            return Object.assign({}, state, {
                activeArticle: null
            });

        case ActionType.CHANGE_REFRESH_STATUS:
            return Object.assign({}, state, {
                refreshStatus: action.payload
            });
    }

    return state;
};

export {reducer, Operation};