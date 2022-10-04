use scrypto::prelude::*;

blueprint! { 
 struct Accounting {
  accounts_payable: Vault,
  earnings: Vault,
  doa_owned_member_tokens: Vault,
 }

 impl Accounting {
   pub fn instantiate_accounting() -> ComponentAddress {
     Self {
      accounts_payable: Vault::new(RADIX_TOKEN),
      earnings: Vault::new(RADIX_TOKEN),
      doa_owned_member_tokens: Vault::new(RADIX_TOKEN),
     }
     .instantiate()
     .globalize()
   }

   pub fn generate_earnings_report() {
    // calculate earnings per member --> member_owned_tokens * earning_per_token <--
    // return members(member -> {member_address: total_earnings_due})

   }

   pub fn distribute_earnings() {
    // Validate accounting_badge && founders_badge

    // distribute earnings to members

    // transfer doa owned earnings to accounts_payable vault
    
   }

   pub fn pay_expenses() {
    // Validate accounting_badge

    // send expense transactions

   }
 }
}
