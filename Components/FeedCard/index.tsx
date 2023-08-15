import React from "react";
import Image from "next/image";
import { BiMessageRounded ,BiUpload} from "react-icons/bi";
import {FaRetweet} from "react-icons/fa"
import {AiOutlineHeart} from "react-icons/ai"
const FeedCard: React.FC = () => {
  return (
    <div className="border border-gray-600 border-l-0 border-r-0 border-b-0 p-4 pr-6 hover:bg-gray-800 cursor-pointer transition-all ">
      <div className="grid grid-cols-12 ">
        <div className="col-span-1 ">
          <Image
            className="rounded-full"
            src="https://avatars.githubusercontent.com/u/56021224?v=4"
            alt="user-profile"
            width={50}
            height={50}
          />
        </div>
        <div className="col-span-11 ml-2">
          <h1 className="text-base font-bold">Vipul</h1>
          <p className="text-sm">
            Is is just me of everyone thinks that Leo Andres Lional Messi is the real GOAT? Just ended a debate #Messiforlife.
          </p>
          <div className="flex justify-between mt-5 text-xl items-center w-[90%] ">
            <div>
              <BiMessageRounded/>
            </div>
            <div>
              <FaRetweet/>
            </div>
            <div>
              <AiOutlineHeart/>
            </div>
            <div>
              <BiUpload/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
