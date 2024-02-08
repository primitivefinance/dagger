import {
  useConnectModal,
} from '@rainbow-me/rainbowkit';

function Header() {
  const { openConnectModal } = useConnectModal();

  return (
    <nav className="flex flex-row items-center justify-between py-2 px-5 border-b border-black border-solid">
      <div className="flex-grow w-full flex-row flex gap-4">
        <a href="#responsive-header">
          🗡️
        </a>
        <a href="#responsive-header">
          Pools
        </a>
        <a href="#responsive-header">
          FAQs
        </a>
      </div>
      <div className="flex-grow w-full flex-row-reverse flex gap-4">
        <button className="p-2 bg-[#000000] text-white" onClick={openConnectModal}>Connect Wallet</button>
        <button className="p-2 bg-[#000000] text-white">Ethereum</button>
      </div>
    </nav>
  );
}

export default Header;