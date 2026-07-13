"use client";

import { shortRelativeTime } from '@/utils/shortRelativeTime';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import CommentForm from '../form/CommentForm';


export interface IComment {
    _id: string,
    text: string,
    author: { firstName: string; lastName: string, avatar: string },
    likeCount: number,
    replyCount: number,
    createdAt: string,
    updatedAt: string,
    totalLikes: number,
    isLiked: boolean
}

const CommentCard: React.FC<{ comment: IComment; postId: string; avatar?: string }> = ({ comment, postId, avatar }) => {
    const { text, author, totalLikes, createdAt } = comment || {}
    const [showCommentForm, setShowCommentForm] = useState(false);

    return (

        <div className="_comment_main">
            <div className="_comment_image">
                <Link href="profile.html" className="_comment_image_link">
                    <Image height={1000} width={1000} src={author?.avatar} alt="" className="_comment_img1" />
                </Link>
            </div>
            <div className="_comment_area">
                <div className="_comment_details">
                    <div className="_comment_details_top">
                        <div className="_comment_name">
                            <Link href="profile.html ">
                                <h4 className="_comment_name_title">{author?.firstName} {author?.lastName}</h4>
                            </Link>
                        </div>
                    </div>
                    <div className="_comment_status">
                        <p className="_comment_status_text"><span>{text}</span></p>
                    </div>
                    <div className="_total_reactions">
                        <div className="_total_react">
                            <span className="_reaction_like">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thumbs-up"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                            </span>
                            <span className="_reaction_heart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </span>
                        </div>
                        <span className="_total">
                            {totalLikes}
                        </span>
                    </div>
                    <div className="_comment_reply">
                        <div className="_comment_reply_num">
                            <ul className="_comment_reply_list">
                                <li><span>Like.</span></li>
                                <li onClick={() => setShowCommentForm(!showCommentForm)}><span>Reply.</span></li>
                                <li><span>Share</span></li>
                                <li><span className="_time_link" style={{ whiteSpace: "nowrap" }}> .{shortRelativeTime(createdAt)}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
                {showCommentForm &&
                    <div className="_feed_inner_comment_box">
                        <CommentForm postId={postId} avatar={avatar} />
                    </div>
                }
            </div>
        </div>
    );
};

export default CommentCard;
