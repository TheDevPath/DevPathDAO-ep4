use scrypto::prelude::*;

blueprint! { 
 struct Voting {
 }

 impl Voting {
   pub fn instantiate_voting() -> ComponentAddress {
     Self {}
     .instantiate()
     .globalize()
   }
 }
}
