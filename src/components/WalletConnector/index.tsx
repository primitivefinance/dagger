import { useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { ReloadIcon } from "@radix-ui/react-icons";

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
      <Button variant="secondary" disabled>
        <div className="flex flex-row items-center text-sm">
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          Connecting
        </div>
      </Button>
    );
  } else if (address === undefined) {
    return (
      <Button variant="secondary" onClick={() => toggleModal(true)}>
        <span className="text-sm">Connect</span>
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
  const [open, setOpen] = useState(false);

  const [isConnecting, toggleConnecting] = useState(false);

  return (
    <Dialog open={(!isConnecting || !address) && open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {getButtonState(address, isConnecting, setOpen)}
      </DialogTrigger>
      <Modal isOpen={open} toggle={setOpen} title="Select a wallet">
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
                    onSuccess: () => setOpen(false),
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
