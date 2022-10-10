use scrypto::prelude::*;

blueprint! { 
 struct Voting {
  elections_votes: Vault,
  operations_votes: Vault,
  // nft_votes: Vault,
 }

 impl Voting {
   pub fn instantiate_voting() -> ComponentAddress {
    let vote_token: Bucket = ResourceBuilder::new_fungible()
         .divisibility(DIVISIBILITY_NONE)
         .metadata("name", "Vote Token")
         .metadata("symbol", "VOTE")
         .initial_supply(1000);
    
    let operations_vote_token: Bucket = ResourceBuilder::new_fungible()
         .divisibility(DIVISIBILITY_NONE)
         .metadata("name", "Ops Vote Token")
         .metadata("symbol", "OpsVOTE")
         .initial_supply(1000);

    

    // let nft_vote_token: Bucket = ResourceBuilder::new_non_fungible()
    //     .metadata("name", "NFT Vote Token");

     Self {
      elections_votes: Vault::with_bucket(vote_token),
      operations_votes: Vault::with_bucket(operations_vote_token),
      // nft_votes: Vault::new(nft_vote_token),
     }
     .instantiate()
     .globalize()
   }

   pub fn simple_nft_vote() {
    // construct simple list ballot + config num of options that can be selected
    // mint nft with ballot selections and deposit into nft_proposals_vault
    // voter must present proof of required badge, ie. members badge, delegate badge or other acceptable badge.
    
   }


   pub fn token_vote(ballot_name: String, vote: String, num_votes: u32) {
    // collect votes
    let _vote: Bucket = ResourceBuilder::new_fungible()
        .metadata("ballot_name",ballot_name)
        .metadata("vote", vote)
        .initial_supply(num_votes);
    

    // deposit signed ballots

    // report results
   }

   pub fn election() {
    // construct ballots

    // collect votes

    // report results
   }


 }
}
