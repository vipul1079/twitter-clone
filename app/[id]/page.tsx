"use server";
import { User } from "@/gql/graphql";
import { graphQLClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";
import UserProfile from "@/Components/UserProfile";
const userProfile = async({ params }: { params: { id: string } }) => {
  const id = params.id;
  const { getUserById } = await graphQLClient.request(getUserByIdQuery, { id });

  const user = getUserById;
  return (
    <div>
      <UserProfile user={user as User}/>
    </div>
  );
};

export default userProfile;
