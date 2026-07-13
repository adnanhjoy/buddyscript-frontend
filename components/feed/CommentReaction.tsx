'use client';

import { likeCommentMutation, likeReplyMutation } from '@/lib/engagement/engagementApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

interface CommentReactionProps {
    id: string;
    type: 'comment' | 'reply';
    parentCacheKey: string;
    isLiked?: boolean;
}

const CommentReaction: React.FC<CommentReactionProps> = ({ id, type, parentCacheKey, isLiked: initialIsLiked }) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked || false);
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: type === 'comment'
            ? () => likeCommentMutation(id)
            : () => likeReplyMutation(id),
        onMutate: async () => {
            const queryKey = type === 'comment'
                ? ['comments', parentCacheKey]
                : ['replies', parentCacheKey];

            await queryClient.cancelQueries({ queryKey });

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
            const queryKey = type === 'comment'
                ? ['comments', parentCacheKey]
                : ['replies', parentCacheKey];

            queryClient.invalidateQueries({ queryKey });
        },
    });

    function handleLike() {
        if (mutation.isPending) return;
        mutation.mutate();
    }

    return (
        <li onClick={handleLike} style={{ cursor: 'pointer' }}>
            <span style={{ color: isLiked ? '#3b82f6' : undefined }}>
                {isLiked ? 'Liked.' : 'Like.'}
            </span>
        </li>
    );
};

export default CommentReaction;
