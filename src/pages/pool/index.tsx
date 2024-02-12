const LinkIcon = () => (
  <svg className="w-4 h-4 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2" />
  </svg>
);


function Pool() {
  return (
    <div className="container mx-auto max-w-4xl my-8">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center">
          <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-8" style={{ zIndex: 1 }} />
          <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-8" style={{ marginLeft: '-8px' }} />
        </div>
        <h1>
          WETH/USDC
        </h1>
        <div className="flex flex-initial flex-row gap-2">
          <div className="self-center bg-blue-600 px-2 rounded-full text-[14px]">0.03%</div>
          <div className="self-center bg-purple-600 px-2 rounded-full text-[14px]">G3M</div>
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
      <div className="grid grid-cols-2 my-8">

        <div className="flex flex-col gap-3">
          <h3>Statistics</h3>
          <div className="flex flex-col">
            TVL
            <h4>$353.24m</h4>
          </div>
          <div className="flex flex-col">
            Volume (24h)
            <h4>$1.25m</h4>
          </div>
          <div className="flex flex-col">
            Fees (24h)
            <h4>$3.75k</h4>
          </div>
        </div>
        <h3>My Position</h3>
      </div>
      <div className="my-8">
        <h3>
          Transactions
        </h3>
        <table>
          <thead>
            <tr>
              <th className="text-left normal-case p-0">Action</th>
              <th className="text-right normal-case">ETH</th>
              <th className="text-right normal-case">USDC</th>
              <th className="text-right normal-case">Value</th>
              <th className="text-right normal-case">Time</th>
              <th className="text-right normal-case">Account</th>
            </tr>
          </thead>
          <tbody style={{ borderTopWidth: '1px' }}>
            <tr>
              <td className="text-left p-0">Add liquidity</td>
              <td className="text-right p-0">1.432</td>
              <td className="text-right p-0">2,414</td>
              <td className="text-right p-0">$4,256</td>
              <td className="text-right p-0">0x1234...1234</td>
              <td className="text-right p-0">3 hours ago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div >
  );
}

export default Pool;