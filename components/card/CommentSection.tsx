"use client";

import { useQuery } from "@tanstack/react-query";
import { getAllCommentsQuery } from "@/lib/engagement/engagementApi";
import CommentCard, { IComment } from "./CommentCard";
import CommentForm from "../form/CommentForm";

interface CommentSectionProps {
    postId: string;
    initialComments: { data: IComment[] };
    commentCount: number;
    avatar?: string;
    author?: { firstName: string; lastName: string; avatar: string };
}

const CommentSection: React.FC<CommentSectionProps> = ({
    postId,
    initialComments,
    commentCount,
    avatar,
    author,
}) => {
    const { data: comments } = useQuery({
        queryKey: ["comments", postId],
        queryFn: () => getAllCommentsQuery(postId),
        initialData: initialComments,
    });

    return (
        <>
            <div className="_feed_inner_timeline_cooment_area">
                <div className="_feed_inner_comment_box">
                    <CommentForm postId={postId} avatar={avatar} author={author} />
                </div>
            </div>
            <div className="_timline_comment_main">
                {commentCount > 2 && (
                    <div className="_previous_comment">
                        <button type="button" className="_previous_comment_txt">
                            View {commentCount - 2} more comments
                        </button>
                    </div>
                )}
                {comments?.data?.map((comment: IComment) => (
                    <CommentCard
                        key={comment?._id}
                        comment={comment}
                        postId={postId}
                        avatar={avatar}
                    />
                ))}
            </div>
        </>
    );
};

export default CommentSection;
