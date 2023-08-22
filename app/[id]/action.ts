"use server"
import { graphQLClient } from "@/clients/api";
import { getUserByIdQuery } from "@/graphql/query/user";



export const getInfo=async({
    params,
  }: {
    params: { id: string }
    }
    
)=>{
    const id=params.id;
    const {getUserById}= await graphQLClient.request(getUserByIdQuery,{id});
    return getUserById;

}



