use scrypto::prelude::*;

blueprint! { 
 struct Accounting {
 }

 impl Accounting {
   pub fn instantiate_accounting() -> ComponentAddress {
     Self {}
     .instantiate()
     .globalize()
   }
 }
}
