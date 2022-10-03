use scrypto::prelude::*;

blueprint! { 
 struct Members {
 }

 impl Members {
   pub fn instantiate_members() -> ComponentAddress {
     Self {}
     .instantiate()
     .globalize()
   }
 }
}
