import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';
import {
  StateApi,
  TransactionApi,
  StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';

function App() {
  const [account, setAccount] = useState('');
  // Initialize the SDK
  const sdk = Sdk();
  const transactionApi = new TransactionApi();
  const stateApi = new StateApi();
  const statusApi = new StatusApi();

  useEffect(() => {
    const getAddress = async () => {
      const result = await sdk.request({
        accountAddresses: {},
      });
      console.log('accountAddresses: ', result.value);
      const { accountAddresses } = result.value;
      setAccount(accountAddresses[0].address);
    };
    getAddress();
    return () => {};
  }, []);

  // create Transaction Manifest to instantiate Component
  let packageAddress =
    'package_tdx_a_1qxewk0hjxuq6ewxgn0h7tygp4vwafeet2hk0fhyxavyscxactj';
  let founders_badge_address = '';
  let manifest = new ManifestBuilder()
    .callMethod(account, 'lock_fee', ['Decimal("100")'])
    .callFunction(packageAddress, 'Members', 'instantiate_members', [
      'Decimal("33")',
    ])
    .callMethod(account, 'deposit_batch', ['Expression("ENTIRE_WORKTOP")'])
    .build()
    .toString();

  console.log('manifest: ', manifest);
  // Send manifest to extension for signing
  const sendToWallet = async () => {
    const hash = await sdk
      .sendTransaction(manifest)
      .map((response) => response.transactionHash);

    if (hash.isErr()) throw hash.error;
    console.log('hash: ', hash);
    // Fetch the receipt from the Gateway SDK
    const receipt = await transactionApi.transactionReceiptPost({
      v0CommittedTransactionRequest: { intent_hash: hash.value },
    });
    console.log('receipt: ', receipt);
    let componentAddress =
      receipt.committed.receipt.state_updates.new_global_entities[0];
    console.log('componentAddress: ', componentAddress);
  };

  return (
    <div className="App">
      <h2>Welcome To Dev Path DAO</h2>
      <p>Connected Account: {account}</p>
      <button onClick={sendToWallet}>Found Your DAO</button> |{' '}
      <button>Get Member Tokens</button>
    </div>
  );
}

export default App;
