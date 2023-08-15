import Image from "next/image";
import { BsTwitter, BsPeople, BsPerson } from "react-icons/bs";
import { BiHomeHeart, BiSearch, BiBookmark } from "react-icons/bi";
import { PiBell } from "react-icons/pi";
import { MdOutlineEmail, MdOutlineVerified } from "react-icons/md";
import { RiFileListLine } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import FeedCard from "@/Components/FeedCard";

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
  return (
    <div>
      <div className="grid grid-cols-10 w-screen pl-30  h-screen px-32">
        <div className=" col-span-2 pt-1 ">
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
            <button className="bg-[#6c4de6] font-medium text-lg rounded-full w-full py-2 mt-5">
              Post
            </button>
          </div>
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
        <div className="col-span-3"></div>
      </div>
    </div>
  );
}
