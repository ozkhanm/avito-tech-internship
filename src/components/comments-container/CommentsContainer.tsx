import { connect } from "react-redux";

import Comment from "../comment/Comment";

import { RootState } from "../../reducer/reducer";
import { IComment } from "../../types/IComment";

interface CommentsContainerProps {
    articleComments: IComment[],
    isCommentLoaded: boolean,
}

const CommentsContainer: React.FC<CommentsContainerProps> = ({ articleComments, isCommentLoaded }) => {
    const getCommentsElements = (comments: IComment[]) => {
        return comments.map((it: IComment) => <Comment key={it.id} comment={it}/>);
    };

    return (
        <div className="comment-block">
            { isCommentLoaded ? getCommentsElements(articleComments) : "" }
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    articleComments: state.articleComments,
    isCommentLoaded: state.isCommentLoaded,
    activeArticle: state.activeArticle,
});

export { CommentsContainer };
export default connect(mapStateToProps)(CommentsContainer);