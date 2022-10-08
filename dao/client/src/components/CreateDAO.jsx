import { useState, useEffect } from 'react';
// Import Radix Wallet and Gateway SDKs
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';
import {
  // StateApi,
  TransactionApi,
  // StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';

const CreateDAO = () => {
  const [account, setAccount] = useState(
    'account_tdx_a_1qd9eafyqjh750uv7scsy474xdceh2x2cjqdccus5k0ls06kddh'
  );
  const [component, setComponent] = useState(
    'component_tdx_a_1qgq6augflx3els05k97ccslfyjxhtgkawtjt23s0lasskjxtyp'
  );
  // Initialize the SDK
  const sdk = Sdk();
  const transactionApi = new TransactionApi();
  // const stateApi = new StateApi();
  // const statusApi = new StatusApi();

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
  }, [sdk]);

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

  return (
    <div className="mt-4 p-4">
      <h2 className="text-3xl font-bold mb-2">Create a DAO</h2>
      <p>DAO Name</p>
      <input type="text" />
      <p>Number of Founders</p>
      <input type="text" />
      <p>Initial Member Token Supply</p>
      <input type="text" />
      <p>List of Contribution Opportunities</p>
      <input type="text" />
      <p>Company Summary</p>
      <input type="text" />
      <p>Goals</p>
      <input type="text" />
      <p>Operators</p>
      <input type="text" />
      <p className="p-2 border-2 m-4">
        <strong>Connected Account: </strong> {account}
      </p>
      <button
        className="mt-2 mr-4 bg-green-700 hover:bg-green-500"
        onClick={createDAO}
      >
        Create DAO
      </button>
      <p className="p-2 border-2 m-4">
        <strong>Members Component Address: </strong> {component}
      </p>
    </div>
  );
};

export default CreateDAO;