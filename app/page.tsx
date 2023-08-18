"use client";
import { BsTwitter, BsPeople, BsPerson } from "react-icons/bs";
import { BiHomeHeart, BiSearch, BiBookmark } from "react-icons/bi";
import { PiBell } from "react-icons/pi";
import { MdOutlineEmail, MdOutlineVerified } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { CgMoreO } from "react-icons/cg";
import FeedCard from "@/Components/FeedCard";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

interface TwitterSidebarButton {
  title: String;
  icon: React.ReactNode;
}
const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeHeart />,
  },
  {
    title: "Explore",
    icon: <BiSearch />,
  },
  {
    title: "Notifications",
    icon: <PiBell />,
  },
  {
    title: "Messages",
    icon: <MdOutlineEmail />,
  },
  {
    title: "Lists",
    icon: <RiFileListLine />,
  },
  {
    title: "Bookmarks",
    icon: <BiBookmark />,
  },
  {
    title: "Communities",
    icon: <BsPeople />,
  },
  {
    title: "Verified",
    icon: <MdOutlineVerified />,
  },
  {
    title: "Profile",
    icon: <BsPerson />,
  },
  {
    title: "More",
    icon: <CgMoreO />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();

  const queryClient = useQueryClient();
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error(`Google token not found`);
      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );
      toast.success("Verified");
      if (verifyGoogleToken)
        localStorage.setItem("__twitter_token", verifyGoogleToken);

      await queryClient.invalidateQueries(["current-user"]);
    },
    []
  );

  return (
    <div>
      <div className="grid grid-cols-10 w-screen pl-30  h-screen px-32">
        <div className=" col-span-2 pt-1 relative">
          <div className="text-3xl cursor-pointer h-fit w-fit rounded-full p-2 hover:bg-gray-800 transition-all">
            <BsTwitter />
          </div>
          <div className="mt-2 mr-6  text-xl ">
            <ul>
              {/* i changed some logic here */}
              {sidebarMenuItems.map((item, key) => (
                <li
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 transition-all w-fit px-3 py-2 cursor-pointer rounded-full"
                  key={key}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 px-3">
              <button className="bg-[#6c4de6] font-medium text-lg rounded-full w-full py-2 ">
                Post
              </button>
            </div>
          </div>
          {user && (
            <div className="absolute flex rounded-full bg-slate-800 px-3 py-2 bottom-5 gap-2 ">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  width={50}
                  height={50}
                  alt="Profile"
                />
              )}
              <div className="flex gap-1">
                <h3 className="text-lg">{user.firstName}</h3>
                <h3 className="text-lg">{user.lastName}</h3>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-5 ml-2 overflow-auto no-scrollbar  border-r-[1px] border-l-[1px]  border-gray-600">
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
          <FeedCard />
        </div>
        <div className="col-span-3 p-5">
          {!user && (
            <div className=" p-5 bg-slate-700 rounded-lg ">
              <h1 className="ml-1 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
