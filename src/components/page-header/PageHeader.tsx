import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { ActionCreator } from "../../reducer/action-creator";
import { AppDispatch, Operation, RootState } from "../../reducer/reducer";
import { PAGE } from "../../constants";

interface PageHeaderProps {
    dropActiveArticle: () => void,
    getArticles: () => void,
    changeCommentsLoadingStatus: (status: boolean) => void,
    activeArticleId: number,
    getActiveArticle: (id: number) => void,
    isCommentLoaded: boolean,
    refreshStatus: boolean,
    page: string,
    errorMessage: string,
    isActiveArticleLoaded: boolean,
    changeRefreshStatus: (status: boolean) => void,
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
    const { dropActiveArticle, getArticles, changeCommentsLoadingStatus, 
        activeArticleId, getActiveArticle, isCommentLoaded, refreshStatus, 
        page, errorMessage, isActiveArticleLoaded, changeRefreshStatus } = props;
    const [refreshButtonToggled, setRefreshButtonToggleStatus] = useState(false);

    useEffect(() => {
        let refreshButtonToggleStatusTimeout: undefined | ReturnType<typeof setTimeout>;

        if (refreshButtonToggled) {
            refreshButtonToggleStatusTimeout = setTimeout(() => {
                setRefreshButtonToggleStatus(false);
                changeRefreshStatus(false);
            }, 3000);
        }

        return () => {
            refreshButtonToggleStatusTimeout ? clearTimeout(refreshButtonToggleStatusTimeout) : undefined;
        };
    });

    const renderHeaderControls = () => {
        const getRefreshButtonAnimationClass = () => {
            let conditions;

            if (page === PAGE.MAIN) {
                conditions = refreshButtonToggled || refreshStatus;
            } else {
                conditions = (refreshButtonToggled && !isCommentLoaded) || refreshStatus;
            }

            return conditions ? "header-controls-refresh-button-animation" : "";
        };

        const getRefreshButtonClassName = () => {
            return `header-controls-button header-controls-refresh-button ${getRefreshButtonAnimationClass()}`;
        };

        const refreshButtonClassName = getRefreshButtonClassName();

        if (page === PAGE.MAIN) {
            return (
                <div className="header-controls">
                    <a className={refreshButtonClassName} onClick={() => {
                        setRefreshButtonToggleStatus(true);
                        getArticles();
                    }}/>
                </div>
            );
        } else {
            return (
                <div className="header-controls">
                    <a className={refreshButtonClassName} onClick={() => {
                        setRefreshButtonToggleStatus(true);
                        changeCommentsLoadingStatus(false);
                        getActiveArticle(activeArticleId);
                    }}/>
                    <Link className="header-controls-button header-controls-return-button" to={"/"} onClick={() => {
                        dropActiveArticle();
                    }}/>
                </div>
            );
        }
    };

    return (
        <>
            <div className="header-container">
                { !!errorMessage || !isActiveArticleLoaded ? null : renderHeaderControls() }
                <p className="header">Hacker News</p>
            </div>
        </>
    );
};

const mapStateToProps = (state: RootState) => ({
    activeArticleId: state.activeArticleId,
    isCommentLoaded: state.isCommentLoaded,
    refreshStatus: state.refreshStatus,
    errorMessage: state.errorMessage,
    isActiveArticleLoaded: state.isActiveArticleLoaded,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    dropActiveArticle() {
        dispatch(ActionCreator.dropActiveArticle());
    },
    getArticles() {
        dispatch(Operation.getArticles());
    },
    changeCommentsLoadingStatus(status: boolean) {
        dispatch(ActionCreator.changeCommentsLoadingStatus(status));
    },
    getActiveArticle(articleId: number) {
        dispatch(Operation.getActiveArticle(articleId));
    },
    changeRefreshStatus(status: boolean) {
        dispatch(ActionCreator.changeRefreshStatus(status));
    },
});

export { PageHeader };
export default connect(mapStateToProps, mapDispatchToProps)(PageHeader);