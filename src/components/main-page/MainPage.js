import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import PageHeader from "../page-header/PageHeader";
import LoadingPage from "../loading-page/LoadingPage";

import {getDate} from "../../utils";

const MainPage = (props) => {
    const {articles, isDataLoaded} = props;

    const getListArticles = (articles) => {
        return articles.map((it) => {
            if (it !== null) {
                const formattedDate = getDate(it.time);
                const additionalInfo = `by: ${it.by} | at: ${formattedDate}`;

                return (
                    <li key={it.id} className="item">                                    
                        <div className="content-block">
                            <Link to={`/${it.id}`} className="item-link">{it.title}</Link>
                            <div>
                                <p className="additional-content-block">{additionalInfo}</p>
                            </div>
                        </div>
                        <p className="score">{it.score}</p>
                    </li>
                );
            } else {
                return;
            }
        });
    };

    if (isDataLoaded) {
        return (
            <React.Fragment>
                <PageHeader page={`MAIN_PAGE`}/>
                <div className="container">
                    <ul className="list">
                        {getListArticles(articles)}
                    </ul>
                </div>
            </React.Fragment>
        );
    } else {
        return <LoadingPage/>;
    }
};

const mapStateToProps = (state) => ({
    articles: state.articles,
    isDataLoaded: state.isDataLoaded
});

export {MainPage};
export default connect(mapStateToProps)(MainPage);