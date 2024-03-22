import { useState } from "react";
import { useAccount, useConnect } from "wagmi";

import Modal from "../Modal";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";

function getButtonState(
  address: string | undefined,
  isConnecting: boolean,
  toggleModal: (state: boolean) => void
) {
  if (isConnecting) {
    return (
      <Button disabled>
        <div className="flex flex-row gap-1 items-center">
          <svg
            className="w-4 h-4 text-dagger4 animate-spin"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M21 12a9 9 0 1 1-6.219-8.56"
            />
          </svg>
          <span className="text-sm">Connecting</span>
        </div>
      </Button>
    );
  } else if (address === undefined) {
    return (
      <Button variant="secondary" onClick={() => toggleModal(true)}>
        Connect Wallet
      </Button>
    );
  } else {
    return (
      <Button variant="secondary">
        <div className="flex flex-row gap-1 items-center">
          <span className="text-sm">
            {address?.slice(0, 6)}...
            {address?.slice(address.length - 4, address.length)}
          </span>
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
    <Dialog open={(!isConnecting || !address) && isModalOpen}>
      <DialogTrigger asChild>
        {getButtonState(address, isConnecting, toggleModal)}
      </DialogTrigger>
      <Modal isOpen={isModalOpen} toggle={toggleModal} title="Select a wallet">
        <div className="flex flex-col gap-4">
          {connectors.map((connector) => (
            <Button
              variant="secondary"
              key={connector.uid}
              onClick={() => {
                toggleConnecting(true);
                connect(
                  {
                    connector,
                  },
                  {
                    onSuccess: () => toggleModal(false),
                    onSettled: () => toggleConnecting(false),
                  }
                );
              }}
            >
              <div className="flex flex-row gap-2 items-center">
                <img
                  src={`/${connector.name}.svg`}
                  alt={connector.name}
                  className="w-6"
                />
                {connector.name}
              </div>
            </Button>
          ))}
        </div>
      </Modal>
    </Dialog>
  );
}

export default WalletSelection;
