"use client";
import React, { useMemo } from "react";
import { BsTwitter, BsPeople, BsPerson } from "react-icons/bs";
import { BiHomeHeart, BiSearch, BiBookmark, BiImageAlt } from "react-icons/bi";
import { PiBell } from "react-icons/pi";
import { MdOutlineEmail, MdOutlineVerified } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { CgMoreO } from "react-icons/cg";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

interface TwitterlayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const Twitterlayout: React.FC<TwitterlayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeHeart />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiSearch />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <PiBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <MdOutlineEmail />,
        link: "/",
      },
      {
        title: "Lists",
        icon: <RiFileListLine />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BiBookmark />,
        link: "/",
      },
      {
        title: "Communities",
        icon: <BsPeople />,
        link: "/",
      },
      {
        title: "Verified",
        icon: <MdOutlineVerified />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BsPerson />,
        link: `/${user?.id}`,
      },
      {
        title: "More",
        icon: <CgMoreO />,
        link: "/",
      },
    ],
    [user?.id]
  );

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
      <div className="grid grid-cols-12 h-screen w-screen lg:px-36">
        <div className=" col-span-2 sm:col-span-3 pt-1 flex lg:justify-end  relative">
          <div>
            <div className="text-3xl pl-4 h-fit cursor-pointer w-fit rounded-full p-2 hover:bg-gray-800 transition-all">
              <BsTwitter />
            </div>
            <div className="mt-1 pl-3 text-xl pr-4">
              <ul>
                {/* i changed some logic here */}
                {sidebarMenuItems.map((item, key) => (
                  <li key={key}>
                    <Link
                      className="flex px-3 justify-start items-center gap-4 hover:bg-gray-800 rounded-full  py-1 w-fit cursor-pointer mt-2"
                      href={item.link}
                    >
                      <span className=" text-3xl">{item.icon}</span>
                      <span className="hidden lg:inline">{item.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-5 ">
                <button className="hidden lg:block bg-[#1d9bf0] font-semibold text-lg py-2 px-4 rounded-full w-full">
                  Post
                </button>
                <button className="block lg:hidden bg-[#1d9bf0] font-semibold text-lg py-2 px-1 w-fit rounded-full ">
                  <BsTwitter />
                </button>
              </div>
            </div>
          </div>
          {user && (
            <div className="absolute bottom-5 flex gap-2 items-center bg-slate-800 px-3 py-1 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  width={50}
                  height={50}
                  alt="Profile"
                />
              )}
              <div className="hidden lg:block">
                <h3 className="text-xl ">
                  {user.firstName} {user.lastName}
                </h3>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-10 sm:col-span-6 h-screen ml-2 overflow-scroll no-scrollbar  border-r-[1px] border-l-[1px]  border-gray-600">
          {props.children}
        </div>
        <div className="col-span-0 sm:col-span-3 p-5">
          {!user && (
            <div className=" p-5 bg-slate-700 rounded-lg ">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Twitterlayout;
