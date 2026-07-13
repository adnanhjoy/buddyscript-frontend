"use client";

import { likePostMutation } from '@/lib/engagement/engagementApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const PostReaction: React.FC<{ postId: string, isLiked?: boolean }> = ({ postId, isLiked: initialIsLiked }) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked || false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => likePostMutation(postId),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['post-likes', postId] });

            const previousState = { isLiked };

            setIsLiked((prev) => !prev);

            return { previousState };
        },
        onError: (_err, _variables, context) => {
            if (context?.previousState) {
                setIsLiked(context.previousState.isLiked);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['post-likes', postId] });
        },
    });

    function handleLike() {
        if (mutation.isPending) return;
        mutation.mutate();
    }

    return (
        <button
            className={`_feed_inner_timeline_reaction_emoji _feed_reaction ${isLiked ? '_feed_reaction_active' : ''}`}
            onClick={handleLike}
            disabled={mutation.isPending}
        >
            <span className="_feed_inner_timeline_reaction_link">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" viewBox="0 0 19 19">
                        <path fill="#FFCC4D" d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"></path>
                        <path fill="#664500" d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"></path>
                        <path fill="#fff" d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"></path>
                        <path fill="#664500" d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"></path>
                    </svg>
                    HaHa
                </span>
            </span>
        </button>
    );
};

export default PostReaction;
