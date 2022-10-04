use scrypto::prelude::*;

blueprint! { 
 struct Voting {
  elections_votes: Vault,
  operations_votes: Vault,
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

     Self {
      elections_votes: Vault::with_bucket(vote_token),
      operations_votes: Vault::with_bucket(operations_vote_token),
     }
     .instantiate()
     .globalize()
   }

   pub fn simple_vote() {
    // construct simple list ballot + config num of options that can be selected
   }

   pub fn operations_vote() {
    // construct initiative ballot

    // collect votes

    // report results
   }

   pub fn election() {
    // construct ballots

    // collect votes

    // report results
   }


 }
}
