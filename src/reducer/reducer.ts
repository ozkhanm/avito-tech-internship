import { batch } from "react-redux";
import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { api } from "../api";
import { initialState } from "./initial-state";
import { ActionType, ActionCreator } from "./action-creator";
import { getArticles, getCommentsTree, getItem } from "../api";
import { NOT_FOUND_ERROR_MESSAGE } from "../constants";

export const Operation = {
    getArticles: () => async (dispatch: AppDispatch) => {
        try {
            const articles = await getArticles();

            batch(() => {
                dispatch(ActionCreator.getArticles(articles));
                dispatch(ActionCreator.changeLoadingStatus(true));
                dispatch(ActionCreator.changeActiveArticleLoadingStatus(true));
            });
        } catch(e) {
            const message = (e as Error).message;

            dispatch(ActionCreator.setErrorMessage(message));
        }
    },
    getActiveArticle: (articleId: number) => async (dispatch: AppDispatch) => {
        try {
            const article = await getItem(articleId);
    
            if (article !== null) {
                const comments = await getCommentsTree(article);

                batch(() => {
                    dispatch(ActionCreator.setActiveArticle(article));
                    dispatch(ActionCreator.getArticleComments(comments));
                    dispatch(ActionCreator.changeActiveArticleLoadingStatus(true));
                    dispatch(ActionCreator.changeCommentsLoadingStatus(true));
                });
            } else {
                dispatch(ActionCreator.setActiveArticle(-1));
                dispatch(ActionCreator.setErrorMessage(NOT_FOUND_ERROR_MESSAGE));
            }
        } catch(e) {
            const message = (e as Error).message;

            dispatch(ActionCreator.setErrorMessage(message));
        }
    },
};

export const reducer = (state = initialState, { type, payload }: AnyAction) => {
    switch (type) {
        case ActionType.CHANGE_LOADING_STATUS:
            return {...state, ...{
                isDataLoaded: payload,
            }};

        case ActionType.GET_ARTICLES:
            return {...state, ...{
                articles: payload,
            }};

        case ActionType.CHANGE_ACTIVE_ARTICLE_ID:
            return {...state, ...{
                activeArticleId: payload,
            }};

        case ActionType.GET_ARTICLE_COMMENTS:
            return {...state, ...{
                articleComments: payload,
            }};

        case ActionType.CHANGE_COMMENTS_LOADING_STATUS:
            return {...state, ...{
                isCommentLoaded: payload,
            }};

        case ActionType.SET_ACTIVE_ARTICLE:
            return {...state, ...{
                activeArticle: payload,
            }};

        case ActionType.CHANGE_ACTIVE_ARTICLE_LOADING_STATUS:
            return {...state, ...{
                isActiveArticleLoaded: payload,
            }};

        case ActionType.DROP_ACTIVE_ARTICLE:
            return {...state, ...{
                activeArticle: null,
            }};

        case ActionType.CHANGE_REFRESH_STATUS:
            return {...state, ...{
                refreshStatus: payload,
            }};

        case ActionType.SET_ERROR_MESSAGE:
            return {...state, ...{
                errorMessage: payload,
            }};
    }

    return state;
};

export const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk.withExtraArgument(api))));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;