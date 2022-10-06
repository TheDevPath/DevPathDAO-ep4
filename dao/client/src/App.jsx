import { useState, useEffect } from 'react';
import './App.css';
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';
import {
  StateApi,
  TransactionApi,
  StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';

function App() {
  const [account, setAccount] = useState(
    'account_tdx_a_1qd9eafyqjh750uv7scsy474xdceh2x2cjqdccus5k0ls06kddh'
  );
  const [component, setComponent] = useState(
    'component_tdx_a_1qgq6augflx3els05k97ccslfyjxhtgkawtjt23s0lasskjxtyp'
  );
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

  // Send manifest to extension for signing
  const createDAO = async () => {
    // create Transaction Manifest to instantiate Component
    let packageAddress =
      'package_tdx_a_1qxewk0hjxuq6ewxgn0h7tygp4vwafeet2hk0fhyxavyscxactj';
    let manifest = new ManifestBuilder()
      .callMethod(account, 'lock_fee', ['Decimal("100")'])
      .callFunction(packageAddress, 'Members', 'instantiate_members', [
        'Decimal("33")',
      ])
      .callMethod(account, 'deposit_batch', ['Expression("ENTIRE_WORKTOP")'])
      .build()
      .toString();
    console.log('instantiate manifest: ', manifest);

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
      receipt.committed.receipt.state_updates.new_global_entities[6]
        .global_address;
    console.log('componentAddress: ', componentAddress);
    setComponent(componentAddress);
  };

  const buyMemberToken = async () => {
    let manifest = new ManifestBuilder()
      .callMethod(account, 'lock_fee', ['Decimal("100")'])
      .withdrawFromAccountByAmount(
        account,
        33,
        'resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9'
      )
      .takeFromWorktopByAmount(
        33,
        'resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9',
        'xrd_bucket'
      )
      .callMethod(component, 'buy_member_tokens', ['Bucket("xrd_bucket")'])
      .callMethod(account, 'deposit_batch', ['Expression("ENTIRE_WORKTOP")'])
      .build()
      .toString();

    // Send manifest to extension for signing
    const hash = await sdk
      .sendTransaction(manifest)
      .map((response) => response.transactionHash);

    if (hash.isErr()) throw hash.error;

    // Fetch the receipt from the Gateway SDK
    const receipt = await transactionApi.transactionReceiptPost({
      v0CommittedTransactionRequest: { intent_hash: hash.value },
    });
    console.log('token receipt: ', receipt);
  };

  return (
    <div className="App">
      <h2 className="text-3xl font-bold mb-2">Welcome To Dev Path DAO</h2>
      <p className="pb-2 pt-2 pr-2 pl-2 border-2 mb-2">
        <strong>Connected Account: </strong> {account}
      </p>
      <button
        className="mt-2 mr-4 bg-green-700 hover:bg-green-500"
        onClick={createDAO}
      >
        Found Your DAO
      </button>
      <button
        className="mt-2 mr-5 bg-green-700 hover:bg-green-500"
        onClick={buyMemberToken}
      >
        Get Member Tokens
      </button>
    </div>
  );
}

export default App;
