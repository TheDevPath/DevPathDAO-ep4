import { useState, useEffect } from 'react';
// Import Radix Wallet and Gateway SDKs
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';
import {
  StateApi,
  TransactionApi,
  StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';

const CreateProposal = () => {
  return (
    <div>
      <h2>Create a New Proposal</h2>
      <p>Add Field</p>
      <button>Create</button>
    </div>
  );
};

export default CreateProposal;
