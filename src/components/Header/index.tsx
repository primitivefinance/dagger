import WalletConnector from '../WalletConnector';
import { Link, Outlet } from "react-router-dom";

function Header() {
  return (
    <>
    <nav className="flex flex-row items-center justify-between py-2 px-5">
      <ul className="flex-grow w-full flex-row flex gap-8 items-center">
        <li>
          <Link to="/" className="hover:no-underline">
            🗡️
          </Link>
        </li>
        <li>
          <Link to="/" className="text-sm text-dagger4 hover:no-underline">
            Pools
          </Link>
        </li>
        <li>
          <Link to="/dashboard" className="text-sm text-dagger4 hover:no-underline">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="create-pool" className="text-sm text-dagger4 hover:no-underline">
            Create
          </Link>
        </li>
        <li>
          <Link to="/faucet" className="text-sm text-dagger4 hover:no-underline">
            Faucet
          </Link>
        </li>
      </ul>
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
      <Outlet />
    </>
  );
}

export default Header;
