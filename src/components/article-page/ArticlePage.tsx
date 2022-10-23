import { connect } from "react-redux";

import PageHeader from "../page-header/PageHeader";
import LoadingPage from "../loading-page/LoadingPage";
import Comments from "../comments/Comments";
import ErrorPage from "../error-page/ErrorPage";

import { getDate } from "../../utils";
import { ActionCreator } from "../../reducer/action-creator";
import { PAGE } from "../../constants";

const ArticlePage = ({ activeArticle, isActiveArticleLoaded, changeActiveArticleId }) => {
    if (isActiveArticleLoaded) {
        changeActiveArticleId(activeArticle.id);

        return (
            <>
                <PageHeader page={PAGE.ARTICLE}/>
                <div className="item-container">
                    <h1>{activeArticle.title} {activeArticle.url ? <a href={activeArticle.url} className="article-data" target="_blank">({activeArticle.url})</a> : ""}</h1>
                    <div className="article-data-block">
                        <p className="article-data">by: {activeArticle.by},</p>
                        <p className="article-data">posted: {getDate(activeArticle.time)},</p>
                        <p className="article-data">comments: {activeArticle.descendants}</p>
                    </div>
                    <hr/>
                    <Comments/>
                </div>
            </>
        );
    } else if (activeArticle === -1) {
        return <ErrorPage/>;
    } else {
        return <LoadingPage/>;
    }
};

const mapStateToProps = state => ({
    activeArticle: state.activeArticle,
    isActiveArticleLoaded: state.isActiveArticleLoaded,
});

const mapDispatchToProps = dispatch => ({
    changeActiveArticleId(articleId) {
        dispatch(ActionCreator.changeActiveArticleId(articleId));
    },
});

export { ArticlePage };
export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);