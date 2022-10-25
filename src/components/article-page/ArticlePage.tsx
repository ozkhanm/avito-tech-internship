import { useEffect } from "react";
import { connect } from "react-redux";

import PageHeader from "../page-header/PageHeader";
import LoadingPage from "../loading-page/LoadingPage";
import CommentsContainer from "../comments-container/CommentsContainer";

import { getFormattedDate } from "../../utils";
import { ActionCreator } from "../../reducer/action-creator";
import { AppDispatch, Operation, RootState } from "../../reducer/reducer";
import { PAGE } from "../../constants";
import { IArticle } from "../../types/IArticle";

interface ArticlePageProps {
    id: number,
    setActiveArticleId: (id: number) => void,
    activeArticle: IArticle | -1 | null,
    isActiveArticleLoaded: boolean,  
    getActiveArticle: (id: number) => void,
}

const ArticlePage: React.FC<ArticlePageProps> = ({ id, setActiveArticleId, activeArticle, isActiveArticleLoaded, getActiveArticle }) => {
    useEffect(() => {
        setActiveArticleId(id);
        getActiveArticle(id);
    }, []);

    if (isActiveArticleLoaded && activeArticle !== null && activeArticle !== -1) {
        const { title, url, time, descendants, by } = activeArticle;

        return (
            <>
                <PageHeader page={PAGE.ARTICLE}/>
                <div className="item-container">
                    <h1>{ title } { url ? <a href={url} className="article-data" target="_blank">({ url })</a> : "" }</h1>
                    <div className="article-data-block">
                        <p className="article-data">by: { by },</p>
                        <p className="article-data">posted: { getFormattedDate(time) },</p>
                        <p className="article-data">comments: { descendants }</p>
                    </div>
                    <hr/>
                    <CommentsContainer/>
                </div>
            </>
        );
    } else {
        return <LoadingPage/>;
    }
};

const mapStateToProps = (state: RootState) => ({
    activeArticle: state.activeArticle,
    activeArticleId: state.activeArticleId,
    isActiveArticleLoaded: state.isActiveArticleLoaded,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getActiveArticle(articleId: number) {
        dispatch(Operation.getActiveArticle(articleId));
    },
    setActiveArticleId(id: number) {
        dispatch(ActionCreator.changeActiveArticleId(id));
    },
});

export { ArticlePage };
export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);