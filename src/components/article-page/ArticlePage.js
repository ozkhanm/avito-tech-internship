import React from "react";
import {connect} from "react-redux";

import PageHeader from "../page-header/PageHeader";
import LoadingPage from "../loading-page/LoadingPage";
import Comments from "../comments/Comments";
import ErrorPage from "../error-page/ErrorPage";

import {getDate} from "../../utils";
import {ActionCreator} from "../../reducer/action-creator";

const ArticlePage = (props) => {
    const {activeArticle, isActiveArticleLoaded, changeActiveArticleId} = props;

    if (isActiveArticleLoaded) {
        changeActiveArticleId(activeArticle.id);

        return (
            <React.Fragment>
                <PageHeader page={`ARTICLE_PAGE`}/>
                <div className="item-container">
                    <h1>{activeArticle.title} {activeArticle.url ? <a href={activeArticle.url} className="article-data">({activeArticle.url})</a> : ``}</h1>
                    <div className="article-data-block">
                        <p className="article-data">by: {activeArticle.by},</p>
                        <p className="article-data">posted: {getDate(activeArticle.time)},</p>
                        <p className="article-data">comments: {activeArticle.descendants}</p>
                    </div>
                    <hr/>
                    <Comments/>
                </div>
            </React.Fragment>
        );
    } else if (activeArticle === -1) {
        return <ErrorPage/>;
    } else {
        return <LoadingPage/>;
    }
};

const mapStateToProps = (state) => ({
    activeArticle: state.activeArticle,
    isActiveArticleLoaded: state.isActiveArticleLoaded
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveArticleId(articleId) {
        dispatch(ActionCreator.changeActiveArticleId(articleId));
    }
});

export {ArticlePage};
export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);