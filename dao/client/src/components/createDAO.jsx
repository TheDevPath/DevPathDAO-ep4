import { useState, useEffect } from 'react';
// Import Radix Wallet and Gateway SDKs
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';
import {
  StateApi,
  TransactionApi,
  StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';

const CreateDAO = () => {
  return (
    <div>
      <h2>CreateDAO</h2>
      <p>DAO Name</p>
      <p>Number of Founders</p>
      <p>Initial Member Token Supply</p>
      <p>List of Contribution Opportunities</p>
      <p>Company Summary</p>
      <p>Goals</p>
      <p>Operators</p>
      <button>Create</button>
    </div>
  );
};

export default CreateDAO;
