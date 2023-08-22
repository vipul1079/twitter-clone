"use client"
import Twitterlayout from "@/Components/Layout/TwitterLayout";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import { useCallback, useState } from "react";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/Components/FeedCard";
import { Tweet, User } from "@/gql/graphql";

interface tweet {
    id: string
    content: string
    imageURL: string

    author: User
}

interface HomePageProp {
    tweets:Tweet[]
}

export default function HomePage({tweets}:HomePageProp) {
  const { user } = useCurrentUser();

  const { mutate } = useCreateTweet();
  const [content, setContent] = useState("");

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    });
  }, [content, mutate]);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  return (
    <div>
      
        <div className="border border-gray-600 border-l-0 border-r-0 border-b-0 p-4 pr-6 hover:bg-gray-800 cursor-pointer transition-all ">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1">
              {user?.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user.profileImageURL}
                  height={50}
                  width={50}
                  alt="profile Image"
                />
              )}
            </div>
            <div className="col-span-11">
              <textarea
                placeholder="What's happening?!"
                onChange={(e) => setContent(e.target.value)}
                rows={2}
                className=" w-full bg-transparent text-lg px-3 border-b border-slate-700 resize-none "
              ></textarea>
              <div className="mt-2 flex justify-between items-center">
                <BiImageAlt onClick={handleSelectImage} className="text-xl " />
                <button
                  onClick={handleCreateTweet}
                  className="bg-[#6c4de6] text-sm rounded-full px-3 py-1  "
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {tweets?.map((tweet) =>
          tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
        )}
    </div>
  );
}
