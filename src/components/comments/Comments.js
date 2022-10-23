import React, {useEffect} from "react";
import {connect} from "react-redux";

import Comment from "../comment/Comment";

import {ActionCreator} from "../../reducer/action-creator";
import {Operation} from "../../reducer/reducer";

const Comments = (props) => {
    const {articleComments, activeArticle, isCommentLoaded, 
        getActiveArticle, changeRefreshStatus, changeCommentsLoadingStatus} = props;

    useEffect(() => {
        const refreshInterval = setInterval(() => {
            changeRefreshStatus(true);
            changeCommentsLoadingStatus(false);
            getActiveArticle(activeArticle.id);
          }, 60000);

        return () => {
            clearInterval(refreshInterval);
        };
    });

    const getCommentsElements = (comments) => {
        return comments.map((it) => <Comment key={it.id} comment={it}/>);
    };

    return (
        <div className="comment-block">
            {isCommentLoaded ? getCommentsElements(articleComments) : ``}
        </div>
    );
};

const mapStateToProps = (state) => ({
    articleComments: state.articleComments,
    isCommentLoaded: state.isCommentLoaded,
    activeArticle: state.activeArticle
});

const mapDispatchToProps = (dispatch) => ({
    getActiveArticle(id) {
        dispatch(Operation.getActiveArticle(id));
    },
    changeRefreshStatus(status) {
        dispatch(ActionCreator.changeRefreshStatus(status));
    },
    changeCommentsLoadingStatus(status) {
        dispatch(ActionCreator.changeCommentsLoadingStatus(status));
    },
});

export {Comments};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);