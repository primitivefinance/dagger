import { useAccount, useConnect } from 'wagmi';

function Header() {
  const { connectors, connect } = useConnect();
  const { address } = useAccount();

  return (
    <nav className="flex flex-row items-center justify-between py-2 px-5">
      <div className="flex-grow w-full flex-row flex gap-8 items-center">
        <a href="/" className="hover:no-underline">
          🗡️
        </a>
        <a href="/" className="text-sm text-dagger4 hover:no-underline">
          Pools
        </a>
        <a href="/" className="text-sm text-dagger4 hover:no-underline">
          More
        </a>
        <a href="/" className="text-sm text-dagger4 hover:no-underline">
          Again
        </a>
        <a href="/" className="text-sm text-dagger4 hover:no-underline">
          FAQs
        </a>
      </div>
      <div className="flex-grow w-full flex-row-reverse flex gap-4 items-center">
        <button onClick={() => connect({ connector: connectors[0] })}>
          <div className="flex flex-row gap-1 items-center">
            {address !== undefined ? (
              <>
                <div className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-sm">{address.slice(0, 6)}...{address.slice(address.length - 4, address.length)}</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4 text-dagger4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z" />
                </svg>
                <span className="text-sm">Connect Wallet</span>
              </>
            )}
          </div>
        </button>
        <button>
          <div className="flex flex-row gap-1 items-center">
            <img src="https://info.uniswap.org/static/media/optimism.34412af263c903b58c43a243c4a21d56.svg" alt="OP" className="rounded-full size-4" />
            <span className="text-sm">Optimism</span>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Header;