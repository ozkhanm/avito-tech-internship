import React, {useState} from "react";

import {getDate, createMarkup} from "../../utils";

const Comment = (props) => {
    const {comment} = props;
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const [kidsCommentsParentId, setKidsCommentsParentId] = useState(-1);

    const getButtonElement = (comment) => {
        const id = comment.id;

        if ((!isButtonPressed) && (comment.hasOwnProperty(`kids`))) {
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

    const getCommentBlock = (comment) => {
        return (
            <div className="comment-parent-block">
                <div className="comment-item-header-block">
                    <p className="comment-item">by: {comment.by}</p>
                    <p className="comment-item">at: {getDate(comment.time)}</p>
                </div>
                <p className="comment-item-text" dangerouslySetInnerHTML={createMarkup(comment.text)}></p>
            </div>
        );
    };

    const getSubcomments = (comments) => {
        return comments.map((it) => {
            if ((!it.hasOwnProperty(`deleted`)) && (!it.hasOwnProperty(`dead`))) {
                return (
                    <div key={it.id} className="comment-item-block">
                        {getCommentBlock(it)}
                        {it.hasOwnProperty(`kids`) ? getSubcomments(it.kids) : null}
                    </div>
                ); 
            } else {
                return;
            }
        });
    };

    const getSubcommentElement = (id) => {
        if (kidsCommentsParentId === id) {
            const comments = comment.kids;
            
            return (
                <React.Fragment>
                    {getSubcomments(comments)}
                </React.Fragment>
            );
        }
    };

    const getParentCommentElement = (comment) => {
        return (
            <div className="comment-item-block">
                {getCommentBlock(comment)}
                {getButtonElement(comment)}
                {getSubcommentElement(comment.id)}
            </div>
        );
    };

    if ((!comment.hasOwnProperty(`deleted`)) && (!comment.hasOwnProperty(`dead`))) {
        return getParentCommentElement(comment);
    } else {
        return null;
    }
};

export default Comment;