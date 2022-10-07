import { useState, useEffect } from 'react';
// Import Radix Wallet and Gateway SDKs
import Sdk, { ManifestBuilder } from '@radixdlt/alphanet-walletextension-sdk';
import {
  StateApi,
  TransactionApi,
  StatusApi,
} from '@radixdlt/alphanet-gateway-api-v0-sdk';

const Proposals = () => {
  return (
    <div>
      <h2>Review and Vote on Proposals</h2>
      <p>Currently Active</p>
      <p>Historical</p>
    </div>
  );
};

export default Proposals;
