"use server"
import Twitterlayout from "@/Components/Layout/TwitterLayout";
import HomePage from "./home";
import { graphQLClient } from "@/clients/api";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { Tweet } from "@/gql/graphql";



export default async function Home () {
  try {
    const  Alltweets  = await graphQLClient.request(getAllTweetsQuery) ;
    
    // Assuming getAllTweets is an array of Tweet objects within the response
    const prop={
      tweets:Alltweets.getAllTweets as Tweet[],
    }

    return (
      <div>
        <Twitterlayout>
          <HomePage props={prop} />
        </Twitterlayout>
      </div>
    );
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return <div>Error fetching tweets</div>;
  }
}
