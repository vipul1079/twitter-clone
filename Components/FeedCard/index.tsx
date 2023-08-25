import React from "react";
import Image from "next/image";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { Tweet } from "@/gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;
  
  return (
    <div className="border border-gray-600 border-l-0 border-r-0 border-b-0 p-4 pr-6 hover:bg-gray-800 cursor-pointer transition-all ">
      <div className="grid grid-cols-12 ">
        <div className="col-span-1 ">
          {data.author?.profileImageURL && (
            <Image
              className="rounded-full"
              src={data.author.profileImageURL}
              alt="user-profile"
              width={50}
              height={50}
            />
          )}
        </div>
        <div className="col-span-11 ml-2">
          <h1 className="text-base font-bold">
            <Link href={`/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
            </Link>
          </h1>
          <p className="text-sm">{data.content}</p>
          {
            
            data.imageURL && <Image className="rounded-lg" src={data.imageURL} width={300} height={300} alt="content-Img" />
          }
          <div className="flex justify-between mt-5 text-xl items-center w-[90%] ">
            <div>
              <BiMessageRounded />
            </div>
            <div>
              <FaRetweet />
            </div>
            <div>
              <AiOutlineHeart />
            </div>
            <div>
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
