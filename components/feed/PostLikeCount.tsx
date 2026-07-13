"use client";

import { likeUserPostQuery } from '@/lib/engagement/engagementApi';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import React from 'react';

interface IPostLikeCount {
    postId: string;
}

interface ILike {
    _id: string;
    avatar: string;
}

const PostLikeCount: React.FC<IPostLikeCount> = ({ postId, }) => {
    const { data: likeData } = useQuery({
        queryKey: ['post-likes', postId],
        queryFn: () => likeUserPostQuery(postId),
    });


    return (
        <div className="_feed_inner_timeline_total_reacts_image">
            {
                likeData?.data?.map((user: ILike) => (
                    <Image
                        key={user?._id}
                        height={1000}
                        width={1000}
                        src={user?.avatar}
                        alt="Image"
                        className="_react_img1"
                    />
                ))
            }
            {
                likeData?.data?.length > 0 ? (
                    <p className="_feed_inner_timeline_total_reacts_para">{likeData?.data?.length}</p>
                ) : <p style={{ fontSize: '12px' }}>No Likes</p>
            }
        </div>
    );
};

export default PostLikeCount;
