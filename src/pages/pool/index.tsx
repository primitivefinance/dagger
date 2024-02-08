const LinkIcon = () => (
  <svg className="w-4 h-4 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2" />
  </svg>
);


function Pool() {
  return (
    <div className="container mx-auto my-8 max-w-6xl">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center">
          <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-8" style={{ zIndex: 1 }} />
          <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-8" style={{ marginLeft: '-8px' }} />
        </div>
        <h1>
          WETH/USDC
        </h1>
        <div className="flex flex-initial flex-row gap-2">
          <div className="self-center text-white bg-blue-600 px-2 rounded-full text-[14px]">0.03%</div>
          <div className="self-center text-white bg-purple-600 px-2 rounded-full text-[14px]">G3M</div>
        </div>
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="flex gap-1">
          ETH
          <a href="#" className="text-blue-600 flex flex-row gap-1">0x1234...1234 <LinkIcon /></a>
        </div>
        <div className="flex gap-1">
          WETH
          <a href="#" className="text-blue-600 flex flex-row gap-1">0x1234...1234 <LinkIcon /></a>
        </div>
        <div className="flex gap-1">
          G3M
          <a href="#" className="text-blue-600 flex flex-row gap-1">0x1234...1234 <LinkIcon /></a>
        </div>
      </div>
    </div>
  );
}

export default Pool;