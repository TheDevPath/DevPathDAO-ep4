use scrypto::prelude::*;

blueprint! { 
 struct Members {
  member_token_vault: Vault,
  voter_badge_vault: Vault,
  accounting_badge_vault: Vault,
  operator_badge_vault: Vault,
  delegate_badge_vault: Vault,
  xrd_tokens_vault: Vault,
  price_per_token: Decimal
 }

 impl Members {
   pub fn instantiate_members(price_per_token: Decimal) -> (ComponentAddress, Bucket ){

     let member_token = ResourceBuilder::new_fungible()
     .divisibility(DIVISIBILITY_MAXIMUM)
     .metadata("name", "Member Token")
     .metadata("symbol", "MEMBER")
     .initial_supply(1000);
   
     let founders_badge: Bucket = ResourceBuilder::new_fungible()
          .divisibility(DIVISIBILITY_NONE)
          .metadata("name", "Founders Badge")
          .initial_supply(1);
          
    let voter_badge: Bucket = ResourceBuilder::new_fungible()
         .divisibility(DIVISIBILITY_NONE)
         .metadata("name", "Voter Badge")
         .initial_supply(1);

    let accounting_badge: Bucket = ResourceBuilder::new_fungible()
         .divisibility(DIVISIBILITY_NONE)
         .metadata("name", "Accounting Badge")
         .initial_supply(1);

    let operator_badge: Bucket = ResourceBuilder::new_fungible()
         .divisibility(DIVISIBILITY_NONE)
         .metadata("name", "Operator Badge")
         .initial_supply(1);
     
     let delegate_badge: Bucket = ResourceBuilder::new_fungible()
          .divisibility(DIVISIBILITY_NONE)
          .metadata("name", "Delegate Badge")
          .initial_supply(1);
               
     let access_rules = AccessRules::new()
          .method("buy_member_tokens", rule!(require(founders_badge.resource_address())))
          .default(rule!(allow_all));            

     let mut component = Self {
      member_token_vault: Vault::with_bucket(member_token),
      xrd_tokens_vault: Vault::new(RADIX_TOKEN),
      voter_badge_vault: Vault::with_bucket(voter_badge),
      accounting_badge_vault: Vault::with_bucket(accounting_badge),
      operator_badge_vault: Vault::with_bucket(operator_badge),
      delegate_badge_vault: Vault::with_bucket(delegate_badge),
      price_per_token: price_per_token
     }
     .instantiate();
     component.add_access_check(access_rules);
     let component = component.globalize();

     return (component, founders_badge)
   }

   pub fn buy_member_tokens(&mut self, funds: Bucket) -> Bucket {
          let purchase_amount: Decimal = funds.amount() / self.price_per_token;
          self.xrd_tokens_vault.put(funds);
          self.member_token_vault.take(purchase_amount)
   }  

 }
}
