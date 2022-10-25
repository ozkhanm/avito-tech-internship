import React, { useState } from "react";

import { getFormattedDate, getFormattedComment } from "../../utils";
import { IComment } from "../../types/IComment";

interface CommentProps {
    comment: IComment,
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [kidsCommentsParentId, setKidsCommentsParentId] = useState(-1);

    const getButtonElement = (comment: IComment) => {
        const id = comment.id;

        if ((!isButtonPressed) && (comment.kids)) {
            return (
                <button className="comment-show-more-block" type="button" onClick={() => {
                    setKidsCommentsParentId(id);
                    setIsButtonPressed(true);
                }}>show more</button>
            );
        } else {
            return;
        }
    };

    const getCommentBlock = (comment: IComment) => {
        return (
            <div className="comment-parent-block">
                <div className="comment-item-header-block">
                    <p className="comment-item">by: { comment.by }</p>
                    <p className="comment-item">at: { getFormattedDate(comment.time) }</p>
                </div>
                <p className="comment-item-text" dangerouslySetInnerHTML={getFormattedComment(comment.text)}></p>
            </div>
        );
    };

    const getSubcomments = (comments: any) => {
        return comments.map((it: IComment) => {
            if ((!it.deleted) && (!it.dead)) {
                return (
                    <div key={it.id} className="comment-item-block">
                        { getCommentBlock(it) }
                        { it.kids ? getSubcomments(it.kids) : null }
                    </div>
                ); 
            } else {
                return;
            }
        });
    };

    const getSubcommentElement = (id: number) => {
        if (kidsCommentsParentId === id) {
            const comments: any = comment.kids;
            
            return (
                <>
                    { getSubcomments(comments) }
                </>
            );
        }
    };

    const getParentCommentElement = (comment: IComment) => {
        return (
            <div className="comment-item-block">
                { getCommentBlock(comment) }
                { getButtonElement(comment) }
                { getSubcommentElement(comment.id) }
            </div>
        );
    };

    if ((!comment.deleted) && (!comment.dead)) {
        return getParentCommentElement(comment);
    } else {
        return null;
    }
};

export default Comment;