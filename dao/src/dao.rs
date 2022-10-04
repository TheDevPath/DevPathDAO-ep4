use scrypto::prelude::*;

blueprint! { 
 struct DAO {
 }

 impl DAO {
   pub fn instantiate_dao() -> ComponentAddress {
    // define initial DAO owned assets

    // define initial dao ownership structure

    // define initial operators roles & compensation
    // % of Dao Earnings

    // define member earnings structure

    // define voting levels ie common_vote, delgate_vote, founders_vote, etc.
    
     Self {}
     .instantiate()
     .globalize()
   }
 }
}
