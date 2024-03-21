import WalletConnector from '../WalletConnector';
import { Link, Outlet } from "react-router-dom";
import Links from './links.json'
import { Button } from '../ui/button';
import { GeistSans } from 'geist/font/sans'

function Root() {
  return (
    <div className={`flex flex-col h-screen justify-between font-primary`}>
      <header className="flex flex-row items-center justify-between py-2 px-5">
          <ul className="flex-grow w-full flex-row flex gap-4 items-center">
            <li>
              <Link to="/" className="hover:no-underline">
                🗡️
              </Link>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/" className="text-sm text-dagger4">
                  Pools
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/dashboard" className="text-sm text-dagger4">
                  Dashboard
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="create-pool" className="text-sm text-dagger4">
                  Create
                </Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/faucet" className="text-sm text-dagger4">
                  Faucet
                </Link>
              </Button>
            </li>
          </ul>
          <div className="w-full flex-row flex gap-4 items-center justify-end">
            <Button variant="secondary">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://info.uniswap.org/static/media/optimism.34412af263c903b58c43a243c4a21d56.svg" alt="OP" className="rounded-full size-4" />
                <span className="text-sm">Optimism</span>
              </div>
            </Button>
            <WalletConnector />
          </div>
      </header>
      <main className="mb-auto">
      <Outlet />
      </main>
      <footer className="py-md w-full">
          <div className="flex flex-start pt-">
            <div id="#row-7" className="flex justify-between w-full gap-md px-4 py-2">
              <div className="flex flex-col">
                <div className="flexw-full md:w-1/2 justify-between align-center mb-2">
                  {Links.links.map((link, index) => (
                    <a
                      key={`${link}-${index}`}
                      className="text-gray-200 hover:text-white hover:underline pr-4"
                      href={link.url}
                      target="_blank"
                    >
                      {link.title}
                    </a>
                  ))}
                </div>
                <br />
                <small>
                  © 2020-{new Date().getFullYear()} Primitive Bits, Inc. All
                  rights reserved.
                </small>
              </div>
              <p className="text-gray-400 disclaimer justify-between text-left">
                Disclaimer: Lorem Ipsum
              </p>
            </div>
          </div>
      </footer>
    </div>
  );
}

export default Root;
