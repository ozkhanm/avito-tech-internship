import React, {useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

import {ActionCreator} from "../../reducer/action-creator";
import {Operation} from "../../reducer/reducer";

const PageHeader = (props) => {
    const {changeActiveArticleLoadingStatus, dropActiveArticle,
        getArticles, changeCommentsLoadingStatus, activeArticleId, getActiveArticle,
        isCommentLoaded, refreshStatus, changeRefreshStatus, page} = props;
    const [refreshButtonToggled, setRefreshButtonToggleStatus] = useState(false);

    setTimeout(() => {
        setRefreshButtonToggleStatus(false);
        changeRefreshStatus(false);
    }, 3000);

    const renderHeaderControls = () => {
        if (page === `MAIN_PAGE`) {
            return (
                <div className="header-controls">
                    <a className={`header-controls-button header-controls-refresh-button ${(refreshButtonToggled || refreshStatus) ? `header-controls-refresh-button-animation` : ``}`} onClick={() => {
                        setRefreshButtonToggleStatus(true);
                        getArticles();
                    }}/>
                </div>
            );
        } else {
            return (
                <div className="header-controls">
                    <a className={`header-controls-button header-controls-refresh-button ${((refreshButtonToggled && !isCommentLoaded) || refreshStatus) ? `header-controls-refresh-button-animation` : ``}`} onClick={() => {
                        setRefreshButtonToggleStatus(true);
                        changeCommentsLoadingStatus(false);
                        getActiveArticle(activeArticleId);
                    }}/>
                    <Link className="header-controls-button header-controls-return-button" to={`/`} onClick={() => {
                        dropActiveArticle();
                        changeActiveArticleLoadingStatus(false);
                    }}/>
                </div>
            );
        }
    };

    return (
        <React.Fragment>
            <div>
                {renderHeaderControls()}
                <p className="header">Hacker News</p>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    activeArticleId: state.activeArticleId,
    isCommentLoaded: state.isCommentLoaded,
    refreshStatus: state.refreshStatus
});

const mapDispatchToProps = (dispatch) => ({
    changeActiveArticleLoadingStatus(status) {
        dispatch(ActionCreator.changeActiveArticleLoadingStatus(status));
    },
    dropActiveArticle() {
        dispatch(ActionCreator.dropActiveArticle());
    },
    getArticles() {
        dispatch(Operation.getArticles());
    },
    changeCommentsLoadingStatus(status) {
        dispatch(ActionCreator.changeCommentsLoadingStatus(status));
    },
    getActiveArticle(articleId) {
        dispatch(Operation.getActiveArticle(articleId));
    },
    changeRefreshStatus(status) {
        dispatch(ActionCreator.changeRefreshStatus(status));
    }
});

export {PageHeader};
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);