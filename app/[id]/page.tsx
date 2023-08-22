"use server"
import TwitterLayout from "@/Components/Layout/TwitterLayout";
import { IoMdArrowBack } from "react-icons/io";



import Image from "next/image";
import FeedCard from "@/Components/FeedCard";
import { Tweet } from "@/gql/graphql";

import {getInfo} from "./action"


const UserProfilePage = async({
  params,
}: {
  params: { id: string }
  }) => {
  


  const user =await getInfo({params});
  
  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex py-2 px-2 gap-5">
            <IoMdArrowBack className="text-3xl p-1 hover:bg-slate-800 rounded-full" />
            <div>
              <h1 className="text-lg font-bold ">{user?.firstName}</h1>
              <h1 className="text-sm text-slate-500">{user? `${user?.tweets?.length} posts`:null}</h1>
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
          <h1 className="text-lg font-bold mt-3 ">{user?.firstName} {user?.lastName}</h1>
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



export default UserProfilePage;
