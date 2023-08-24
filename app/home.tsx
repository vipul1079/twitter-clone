"use client";
import Twitterlayout from "@/Components/Layout/TwitterLayout";
import { useCreateTweet, useGetAllTweets } from "@/hooks/tweet";
import { useCurrentUser } from "@/hooks/user";
import { useCallback, useState } from "react";
import Image from "next/image";
import { BiImageAlt } from "react-icons/bi";
import FeedCard from "@/Components/FeedCard";
import { Tweet } from "@/gql/graphql";
import { graphQLClient } from "@/clients/api";
import { getSignedURLForTweetQuery } from "@/graphql/query/tweet";
import axios from "axios";
import toast from "react-hot-toast";

export default function HomePage({ props }: any) {
  const { user } = useCurrentUser();

  const { mutateAsync } = useCreateTweet();
  const [content, setContent] = useState("");
  const [imageURL,setImageURL]=useState("");
  const { tweets = props.tweets as Tweet[] } = useGetAllTweets();

  const handleCreateTweet = useCallback(async () => {
    await mutateAsync({
      content,
      imageURL,
    });
    setContent("");
    setImageURL("");
  }, [mutateAsync,imageURL, content]);
  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;
      const { getSignedURLForTweet } = await graphQLClient.request(
        getSignedURLForTweetQuery,
        {
          imageName: file.name,
          imageType: file.type,
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Upload Completed", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFilePath = `${url.origin}${url.pathname}`;
        setImageURL(myFilePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    const handlerFn = handleInputChangeFile(input);
    input.addEventListener("change", handlerFn);

    input.click();

  }, [handleInputChangeFile]);

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
              value={content}
              placeholder="What's happening?!"
              onChange={(e) => setContent(e.target.value)}
              rows={2}
              className=" w-full bg-transparent text-lg px-3 border-b border-slate-700 resize-none "
            ></textarea>
            {
              imageURL&& <Image src={imageURL} width={300} height={300} alt="selected-image"/>
            }
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
