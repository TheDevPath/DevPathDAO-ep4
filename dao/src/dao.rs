use scrypto::prelude::*;

blueprint! { 
 struct DAO {
 }

 impl DAO {
   pub fn instantiate_dao() -> ComponentAddress {
    
     Self {}
     .instantiate()
     .globalize()
   }
 }
}
