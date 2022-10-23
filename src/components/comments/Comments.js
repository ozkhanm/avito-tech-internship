import React from "react";
import {connect} from "react-redux";

import Comment from "../comment/Comment";

const Comments = (props) => {
    const {articleComments, isCommentLoaded} = props;

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

export {Comments};
export default connect(mapStateToProps)(Comments);