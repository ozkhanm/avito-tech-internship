import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PageHeader from "../page-header/PageHeader";
import LoadingPage from "../loading-page/LoadingPage";

import { getFormattedDate } from "../../utils";
import { AppDispatch, Operation, RootState } from "../../reducer/reducer";
import { PAGE, REFRESH_TIMEOUT } from "../../constants";
import { IArticle } from "../../types/IArticle";

interface MainPageProps {
    articles: IArticle[],
    isDataLoaded: boolean,
    getArticles: () => void,
}

const MainPage: React.FC<MainPageProps> = ({ articles, isDataLoaded, getArticles }) => {
    useEffect(() => {
        const refreshInterval = setInterval(() => {
            getArticles();
          }, REFRESH_TIMEOUT);

        return () => {
            clearInterval(refreshInterval);
        };
    });

    useEffect(() => {
        if (articles.length === 0 && isDataLoaded !== true) {
            getArticles();
        }
    }, []);

    const getListArticles = (articles: IArticle[]) => {
        return articles.map((it: IArticle) => {
            if (it !== null) {
                const formattedDate = getFormattedDate(it.time);
                const additionalInfo = `by: ${ it.by } | at: ${ formattedDate }`;

                return (
                    <li key={it.id} className="item">                                    
                        <div className="content-block">
                            <Link to={`/${it.id}`} className="item-link">{ it.title }</Link>
                            <div>
                                <p className="additional-content-block">{ additionalInfo }</p>
                            </div>
                        </div>
                        <p className="score">{ it.score }</p>
                    </li>
                );
            } else {
                return;
            }
        });
    };

    if (isDataLoaded) {
        return (
            <>
                <PageHeader page={PAGE.MAIN}/>
                <div className="container">
                    <ul className="list">
                        { getListArticles(articles) }
                    </ul>
                </div>
            </>
        );
    } else {
        return <LoadingPage/>;
    }
};

const mapStateToProps = (state: RootState) => ({
    articles: state.articles,
    isDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    getArticles() {
        dispatch(Operation.getArticles());
    },
})

export { MainPage };
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);