const LinkIcon = () => (
  <svg className="w-3 h-3 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path className="text-blue-600" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2" />
  </svg>
);


function Pool() {
  return (
    <div className="container mx-auto max-w-4xl my-8">
      <div className="flex flex-col gap-2">
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
          <div className="flex gap-1 items-center">
            <p className="font-bold">WETH</p>
            <a href="#" className="flex flex-row gap-1 text-sm">0x1234...1234 <LinkIcon /></a>
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-bold">USDC</p>
            <a href="#" className="flex flex-row gap-1 text-sm">0x1234...1234 <LinkIcon /></a>
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-bold">G3M</p>
            <a href="#" className="flex flex-row gap-1 text-sm">0x1234...1234 <LinkIcon /></a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 my-8 gap-8">
        <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4">
          <div className="grid gap-4 grid-cols-2">
            <div className="flex flex-col col-span-2">
              <p className="text-lg font-bold">Statistics</p>
              <p className="text-dagger3 text-xs">Lorem ipsum at dolor simet.</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-dagger3">TVL</p>
              <p className="font-bold">$353.24m</p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-dagger3">Volume (24h)</p>
              <p className="font-bold">$1.25m</p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                <p className="text-xs text-dagger3">WETH</p>
              </div>
              <p className="font-bold">1.44 WETH <span className="text-xs font-normal text-dagger3">($3,535.24)</span></p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-dagger3">Fees (24h)</p>
              <p className="font-bold">$3.75k</p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-4" />
                <p className="text-xs text-dagger3">USDC</p>
              </div>
              <p className="font-bold">3,252.24 USDC <span className="text-xs font-normal text-dagger3">($3,535.64)</span></p>
            </div>
          </div>
        </div>
        <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-lg font-bold">My Position</p>
              <p className="text-dagger3 text-xs">Lorem ipsum at dolor simet.</p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                <p className="text-xs text-dagger3">WETH</p>
              </div>
              <p className="font-bold">1.44 WETH <span className="text-xs font-normal text-dagger3">($3,535.24)</span></p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-4" />
                <p className="text-xs text-dagger3">USDC</p>
              </div>
              <p className="font-bold">3,252.24 USDC <span className="text-xs font-normal text-dagger3">($3,535.64)</span></p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-dagger3 ">Total Deposited</p>
              <p className="font-bold">$7,043.41</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 my-8 gap-8">
        <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <p className="text-lg font-bold">Manage</p>
              <p className="text-dagger3 text-xs">Manage your position.</p>
            </div>
            <div className="flex flex-row border-solid border-dagger2 border rounded-lg">
              <button>Add</button>
              <button>Remove</button>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                <p className="text-xs text-dagger3">WETH</p>
              </div>
              <p className="font-bold">1.44 WETH <span className="text-xs font-normal text-dagger3">($3,535.24)</span></p>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-4" />
                <p className="text-xs text-dagger3">USDC</p>
              </div>
              <p className="font-bold">3,252.24 USDC <span className="text-xs font-normal text-dagger3">($3,535.64)</span></p>
            </div>
            <div className="flex flex-col">
              <p className="text-xs text-dagger3 ">Total Deposited</p>
              <p className="font-bold">$7,043.41</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-8">
        <p className="text-lg font-bold mb-2">Recent Transactions</p>
        <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
          <table>
            <thead>
              <tr>
                <th className="text-left">Action</th>
                <th>
                  <div className="flex flex-row gap-1 items-center justify-end">
                    <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                    <p className="text-xs text-dagger3">WETH</p>
                  </div>
                </th>
                <th>
                  <div className="flex flex-row gap-1 items-center justify-end">
                    <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-4" />
                    <p className="text-xs text-dagger3">USDC</p>
                  </div>
                </th>
                <th className="text-right">Value</th>
                <th className="text-right">Account</th>
                <th className="text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left">Add liquidity</td>
                <td className="text-right">1.432 WETH</td>
                <td className="text-right">2,414.42 USDC</td>
                <td className="text-right">$4,256</td>
                <td className="text-right">0x1234...1234</td>
                <td className="text-right">3 hours ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

export default Pool;