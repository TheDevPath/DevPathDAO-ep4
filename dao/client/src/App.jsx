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
      console.log(result.value);
      const { accountAddresses } = result.value;
      setAccount(accountAddresses[0].address);
    };
    getAddress();

    return () => {};
  }, []);

  return (
    <div className="App">
      <h2>Welcome To Dev Path DAO</h2>
      <p>Account Address: {account}</p>
    </div>
  );
}

export default App;
