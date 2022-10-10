use scrypto::prelude::*;

blueprint! { 
 struct Voting {
    admin_badge_vault: Vault,
//   shareholder_badge_resource_address: ResourceAddress,
 }

 impl Voting {
     // TODO pass founders or operators badge for auth
   pub fn instantiate_voting(auth_badge: Proof) -> ComponentAddress {

     let admin_badge: Bucket = ResourceBuilder::new_fungible()
     .divisibility(DIVISIBILITY_NONE)
     .metadata("name", "Admin Badge")
     .metadata("description", "An admin badge used for internal functionality of creating vote tokens & ballots.")
     .initial_supply(dec!("1"));

     // NFT badge for representing shareholders ** could also be utilized for delgate voting possibly
     let _shareholder_badge: ResourceAddress = ResourceBuilder::new_non_fungible()
          .metadata("name", "Shareholder Badge")
          .metadata(
          "description",
          "A non-fungible-token used to authenticate shareholders.",
          )
          .mintable(
          rule!(require(admin_badge.resource_address())),
          Mutability::LOCKED,
          )
          .burnable(
          rule!(require(admin_badge.resource_address())),
          Mutability::LOCKED,
          )
          .no_initial_supply();

     Self {
     admin_badge_vault: Vault::with_bucket(admin_badge),
     }
     .instantiate()
     .globalize()
   }

   pub fn simple_nft_vote() {
    // construct simple list ballot + config num of options that can be selected
    // mint nft with ballot selections and deposit into nft_proposals_vault
    // voter must present proof of required badge, ie. members badge, delegate badge or other acceptable badge.
    
   }

   pub fn create_ballot(&mut self, ballot_options: Vec<String>) {
     // iterate over ballot options and create a vault/token pair for each option

   }

// require proof of voters badge --> include num_member_tokens for weighted votes/delegate voters
   pub fn token_vote(ballot_name: String, vote: String, num_votes: u32) {
     // general purpose voting tokens

    // collect votes
    let vote_token: Bucket = ResourceBuilder::new_fungible()
        .metadata("ballot_name",ballot_name)
        .metadata("vote", vote)
        .initial_supply(num_votes);
    // deposit signed ballot w/num_votes * vote_token into vault with corresponding ballot_name/vote

    // report results
   }

   pub fn create_election() {
    // construct ballots

    // create vault to collect votes

    
   }

   pub fn tally_votes(ballot_id: ResourceAddress) {
     // get list of vaults assaciated with ballot_id


     // count num of tokens for each ballot vault

     // evaluate ballot vaults to determine ranked results

     // report results
   }


 }
}
