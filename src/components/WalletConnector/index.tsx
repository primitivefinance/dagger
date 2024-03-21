import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';

import Modal from '../Modal';
import { Button } from '../ui/button';

function getButtonState(
  address: string | undefined,
  isConnecting: boolean,
  toggleModal: (state: boolean) => void,
) {
  if (isConnecting) {
    return (
      <button>
        <div className="flex flex-row gap-1 items-center">
          <svg className="w-4 h-4 text-dagger4 animate-spin" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
          <span className="text-sm">Connecting</span>
        </div>
      </button>
    );
  } else if (address === undefined) {
    return (
      <Button variant="secondary" onClick={() => toggleModal(true)}>
        <div className="flex flex-row gap-1 items-center">
          <svg className="w-4 h-4 text-dagger4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z" />
          </svg>
          <span className="text-sm">Connect Wallet</span>
        </div>
      </Button>
    );
  } else {
    return (
      <Button variant="secondary">
        <div className="flex flex-row gap-1 items-center">
          <span className="text-sm">{address?.slice(0, 6)}...{address?.slice(address.length - 4, address.length)}</span>
        </div>
      </Button>
    );
  }
}

function WalletSelection() {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();

  const [isModalOpen, toggleModal] = useState(false);
  const [isConnecting, toggleConnecting] = useState(false);

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        toggle={toggleModal}
        title="Select a wallet"
      >
        <div className="flex flex-col gap-4">
          {connectors.map((connector) => (
            <Button variant="secondary"
              key={connector.uid}
              onClick={() => {
                toggleConnecting(true);
                connect({
                  connector,
                }, {
                  onSuccess: () => toggleModal(false),
                  onSettled: () => toggleConnecting(false),
                });
              }}
            >
              <div className="flex flex-row gap-2 items-center">
                <img src={`/${connector.name}.svg`} alt={connector.name} className="w-6" />
                {connector.name}
              </div>
            </Button>
          ))}
        </div>
      </Modal>
      {getButtonState(address, isConnecting, toggleModal)}
    </>
  )
}

export default WalletSelection;
