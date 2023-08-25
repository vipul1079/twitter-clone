"use client";
import { User } from "@/gql/graphql";
import { useCurrentUser } from "@/hooks/user";
import React, { useMemo, useCallback } from "react";
import { graphQLClient } from "@/clients/api";
import { getCurrentUserQuery, getUserByIdQuery } from "@/graphql/query/user";

import TwitterLayout from "@/Components/Layout/TwitterLayout";
import { IoMdArrowBack } from "react-icons/io";

import Image from "next/image";
import FeedCard from "@/Components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useQueryClient } from "@tanstack/react-query";

const UserProfile = ({ user }: { user: User }) => {
  const currUser = useCurrentUser();
  const queryClient = useQueryClient();
  const handleFollowUser = useCallback(async () => {
    if (!user?.id) return;
    await graphQLClient.request(followUserMutation, { to: user?.id });
    await queryClient.invalidateQueries(["current-user"]);
  }, [queryClient, user?.id]);

  const handleUnfollowUser =useCallback(async () => {
    if (!user?.id) return;
    await graphQLClient.request(unfollowUserMutation, { to: user?.id });
    await queryClient.invalidateQueries(["current-user"]);
  }, [queryClient, user?.id]); 

  const amIFollowing = useMemo(() => {
    if (!user) return false;
    return (
      (currUser?.data?.getCurrentUser?.following?.findIndex(
        (el) => el?.id === user?.id
      ) ?? -1) >= 0
    );
  }, [currUser?.data?.getCurrentUser?.following, user]);

  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex py-2 px-2 gap-5">
            <IoMdArrowBack className="text-3xl p-1 hover:bg-slate-800 rounded-full" />
            <div>
              <h1 className="text-lg font-bold ">{user?.firstName}</h1>
              <h1 className="text-sm text-slate-500">
                {user ? `${user?.tweets?.length} posts` : null}
              </h1>
            </div>
          </nav>
        </div>
        <div className="p-4 border-b border-slate-800">
          {user?.profileImageURL && (
            <Image
              className="rounded-full "
              src={user?.profileImageURL}
              width={120}
              height={120}
              alt="Profile Image"
            />
          )}
          <h1 className="text-lg font-bold mt-3 ">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="flex justify-between">
            <div className="flex gap-2 text-sm text-gray-400">
              <span>{user?.followers?.length} followers</span>
              <span>{user?.following?.length} following</span>
            </div>
            {currUser?.data?.getCurrentUser?.id !== user?.id && (
              <>
                {amIFollowing ? (
                  <button
                    onClick={handleUnfollowUser}
                    className="bg-white px-3 py-1 text-gray-600 text-sm rounded-full "
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={handleFollowUser}
                    className="bg-white px-3 py-1 text-gray-600 text-sm rounded-full "
                  >
                    Follow
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        <div>
          {user?.tweets?.map((tweet) => (
            <FeedCard data={tweet as Tweet} key={tweet?.id} />
          ))}
        </div>
      </TwitterLayout>
    </div>
  );
};

export default UserProfile;
