import { useState } from 'react';
import { tokens } from '../../data/tokens';

type TokenSelectorProps = {
  tokenLogo: string;
  tokenSymbol: string;
  setToken: (token: `0x${string}`) => void;
};

function TokenSelector(props: TokenSelectorProps) {
  const [isOpen, toggle] = useState(false);
  const [search, setSearch] = useState<string>('');

  function close() {
    document.body.style.overflow = 'auto';
    toggle(false);
  }

  return (
    <>
      {isOpen && (
        <div className="transition top-0 left-0 absolute bg-dagger0 z-10 w-screen h-screen flex justify-center items-center">
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
            <div className="flex flex-row gap-2 bg-dagger1 border-dagger2 border border-solid p-2 rounded-lg items-center">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path className="text-dagger3" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
              </svg>
              <input
                type="text"
                placeholder="Search by symbol or address"
                className="flex-grow"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex flex-row gap-4 items-center flex-wrap">
              {tokens.map((token) => (
                <div
                  key={token.address}
                  className="cursor-pointer flex flex-row gap-1 items-center border-dagger2 border border-solid rounded-full py-1 px-3 hover:opacity-50"
                  onClick={() => {
                    props.setToken(token.address);
                    close();
                  }}
                >
                  <img src={token.logo} alt={token.symbol} className="rounded-full size-4" />
                  <span className="text-sm">{token.symbol}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-col justify-center overflow-auto max-h-96" style={{ scrollbarWidth: 'none' }}>
              {tokens.filter((token) => token.name.includes(search) || token.symbol.includes(search)).map((token) => (
                <div
                  key={token.address}
                  className="flex flew-row gap-3 items-center cursor-pointer border border-transparent hover:border-dagger2 hover:border border-solid p-2 rounded-xl"
                  onClick={() => {
                    props.setToken(token.address);
                    close();
                  }}
                >
                  <img src={token.logo} alt={token.symbol} className="rounded-full size-10" />
                  <div className="flex flex-col">
                    <p className="text-left">{token.symbol}</p>
                    <p className="text-left text-dagger3 text-sm">{token.name}</p>
                  </div>
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