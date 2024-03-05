import WalletConnector from '../WalletConnector';

function Header() {
  return (
    <nav className="flex flex-row items-center justify-between py-2 px-5">
      <div className="flex-grow w-full flex-row flex gap-8 items-center">
        <a href="/" className="hover:no-underline">
          🗡️
        </a>
        <a href="/" className="text-sm text-dagger4 hover:no-underline">
          Pools
        </a>
        <a href="/dashboard" className="text-sm text-dagger4 hover:no-underline">
          Dashboard
        </a>
        <a href="/create-pool" className="text-sm text-dagger4 hover:no-underline">
          Create
        </a>
        <a href="/faucet" className="text-sm text-dagger4 hover:no-underline">
          Faucet
        </a>
      </div>
      <div className="flex-grow w-full flex-row-reverse flex gap-4 items-center">
        <WalletConnector />
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