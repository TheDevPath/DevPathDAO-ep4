import { useState, useEffect } from 'react';
// Import Radix Wallet and Gateway SDKs
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';
import {
  StateApi,
  TransactionApi,
  StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';

const createBallot = () => {
  return (
    <div className="">
      <h2>createBallot</h2>
      <p>Add Ballot Item</p>
      <button>Create</button>
    </div>
  );
};

export default createBallot;
