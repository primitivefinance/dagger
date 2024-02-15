import { useState } from 'react';
import { tokens } from '../../data/tokens';

type TokenSelectorProps = {
  tokenLogo: string;
  tokenSymbol: string;
};

function TokenSelector(props: TokenSelectorProps) {
  const [isOpen, toggle] = useState(false);

  function close() {
    document.body.style.overflow = 'auto';
    toggle(false);
  }

  return (
    <>
      {isOpen && (
        <div className="top-0 left-0 absolute bg-dagger0 z-10 w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col gap-4 bg-dagger1 border-dagger2 border border-solid p-4 rounded-lg max-w-md">
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold text-base">Select a token</p>
              <svg
                onClick={() => close()}
                className="w-5 h-5 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18 18 6m0 12L6 6" />
              </svg>
            </div>
            <p className="text-sm">Select a token from our default list or search for a token by symbol or address.</p>
            <div className="flex flex-row gap-4 items-center">
              {tokens.map((token) => (
                <div className="flex flex-row gap-1 items-center border-dagger2 border border-solid rounded-full py-1 px-3">
                  <img src={token.logo} alt={token.symbol} className="rounded-full size-4" />
                  <span className="text-sm">{token.symbol}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => {
          if (isOpen) {
            document.body.style.overflow = 'auto';
          } else {
            document.body.style.overflow = 'hidden';
          }

          toggle(!isOpen);
        }}
      >
        <div className="flex flex-row gap-2 items-center">
          <div className="flex flex-row gap-1 items-center">
            <img src={props.tokenLogo} alt={props.tokenSymbol} className="rounded-full size-4" />
            <span className="text-base">{props.tokenSymbol}</span>
          </div>
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9-7 7-7-7" />
          </svg>
        </div>
      </button>
    </>
  );
}

export default TokenSelector;