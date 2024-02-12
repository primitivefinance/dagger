import { useState, useRef } from 'react';

const LinkIcon = () => (
  <svg className="w-3 h-3 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path className="text-blue-600" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M18 14v4.8a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 18.8V7.2A1.2 1.2 0 0 1 5.2 6h4.6m4.4-2H20v5.8m-7.9 2L20 4.2" />
  </svg>
);

function Pool() {
  const [isAddLiquidity, setIsAddLiquidity] = useState<boolean>(true);
  const ref = useRef(null);
  const [range, setRange] = useState<number>(0);

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
        <div className="flex flex-row items-center gap-5">
          <div className="flex gap-1 items-center">
            <p className="font-bold">WETH</p>
            <a href="#" className="flex flex-row gap-1 text-sm">0x1234...1234 <LinkIcon /></a>
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-bold">USDC</p>
            <a href="#" className="flex flex-row gap-1 text-sm">0x1234...1234 <LinkIcon /></a>
          </div>
          <div className="flex gap-1 items-center">
            <p className="font-bold">WETH/USDC</p>
            <a href="#" className="flex flex-row gap-1 text-sm">0x1234...1234 <LinkIcon /></a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 my-8 gap-8">

        <div className="flex flex-col gap-8">

          <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-lg font-bold">My Position</p>
                <p className="text-dagger3 text-xs">$7,043.41</p>
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
                <p className="text-xs text-dagger3">Total Liquidity</p>
                <p className="font-bold">7,043.41</p>
              </div>
            </div>
          </div>


          <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 border-solid border border-dagger2 w-full rounded-xl">
                <button
                  className={`border-0 ${isAddLiquidity ? 'bg-dagger2' : 'border-0'}`}
                  onClick={() => setIsAddLiquidity(true)}
                >
                  <div className="flex flex-row items-center gap-1 justify-center">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    Add liquidity
                  </div>
                </button>
                <button
                  className={`border-0 ${isAddLiquidity ? 'border-0' : 'bg-dagger2'}`}
                  onClick={() => setIsAddLiquidity(false)}
                >
                  <div className="flex flex-row items-center gap-1 justify-center">
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 12h14" />
                    </svg>
                    Remove liquidity
                  </div>
                </button>
              </div>
              {isAddLiquidity ? (
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">Add Liquidity</p>
                    <p className="text-dagger3 text-xs">Increase your position by adding liquidity into the pool.</p>
                  </div>
                  <div className="grid grid-cols-2 border border-solid border-dagger2 p-3 rounded-xl gap-2">
                    <input className="text-lg" placeholder="0.0" />
                    <div className="flex flex-row gap-1 items-center justify-end">
                      <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                      <p className="text-dagger4">WETH</p>
                    </div>
                    <p className="text-sm text-dagger3">$0.0</p>
                    <button className="p-0 border-0 hover:opacity-100">
                      <div className="flex flex-row gap-1 justify-end items-center">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path className="text-dagger3 hover:text-dagger4" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z" />
                        </svg>
                        <p className="text-sm text-dagger3 hover:text-dagger4">
                          1.525 WETH
                        </p>
                      </div>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 border border-solid border-dagger2 p-3 rounded-xl gap-2">
                    <input className="text-lg" placeholder="0.0" />
                    <div className="flex flex-row gap-1 items-center justify-end">
                      <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                      <p className="text-dagger4">WETH</p>
                    </div>
                    <p className="text-sm text-dagger3">$0.0</p>
                    <button className="p-0 border-0 hover:opacity-100  hover:text-dagger4">
                      <div className="flex flex-row gap-1 justify-end items-center">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <path className="text-dagger3" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z" />
                        </svg>
                        <p className="text-sm text-dagger3">
                          3,525.52 USDC
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">Remove Liquidity</p>
                    <p className="text-dagger3 text-xs">Decrease your position by removing liquidity from the pool.</p>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <p className="text-xl">
                      {range}%
                    </p>
                    <div className="flex flex-row gap-2">
                      <button onClick={() => setRange(25)}>25%</button>
                      <button onClick={() => setRange(50)}>50%</button>
                      <button onClick={() => setRange(75)}>75%</button>
                      <button onClick={() => setRange(100)}>MAX</button>
                    </div>
                  </div>
                  <input
                    ref={ref}
                    type="range"
                    className="col-span-2 appearance-none bg-dagger2 rounded-full cursor-pointer h-1 w-full"
                    step={1}
                    min={0}
                    max={100}
                    onChange={(e) => setRange(parseInt(e.target.value, 10))}
                    value={range}
                  />
                  <div className="flex flex-row gap-1 items-center justify-end">
                    <p className="text-dagger3 text-xs">You'll receive at least</p>
                    <p className="text-dagger4 text-sm">1.42</p>
                    <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                    <p className="text-dagger4 text-sm">WETH</p>
                    <p className="text-dagger3 text-xs">and</p>
                    <p className="text-dagger4 text-sm">2,415.24</p>
                    <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-4" />
                    <p className="text-dagger4 text-sm">USDC<span className="text-dagger3">.</span></p>
                  </div>
                </div>
              )}
              <button>Connect Wallet</button>
            </div>
          </div>

        </div>

        <div className="flex flex-col gap-8">


          <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
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

          <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
            <div className="grid gap-4 grid-cols-2">
              <div className="flex flex-col col-span-2">
                <p className="text-lg font-bold">Pool Details</p>
                <p className="text-dagger3 text-xs">Specific pool parameters goes here.</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-dagger3">Strategy</p>
                <p className="font-bold">G3M</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-dagger3">Fee Rate</p>
                <p className="font-bold">0.03%</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-dagger3">Controller</p>
                <a href="#" className="flex flex-row gap-1 font-bold">0xbeef...cafe <LinkIcon /></a>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-dagger3">Weight X</p>
                <p className="font-bold">50%</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-dagger3">Weight Y</p>
                <p className="font-bold">50%</p>
              </div>
              <div className="flex flex-col">
                <p className="text-xs text-dagger3">Weight Update</p>
                <p className="font-bold">On-going</p>
              </div>
            </div>
          </div>

          <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid p-4 self-start w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <p className="text-lg font-bold">Strategy</p>
                <p className="text-dagger3 text-xs">G3M</p>
              </div>
              <p className="text-sm text-dagger3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec dui eget urna aliquet aliquam.</p>
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
                <td className="text-left font-bold">Add liquidity</td>
                <td className="text-right">1.432</td>
                <td className="text-right">2,414.42</td>
                <td className="text-right">$4,256</td>
                <td className="text-right">
                  <a href="#" className="flex flex-row gap-1 font-bold justify-end">0xbeef...cafe <LinkIcon /></a>
                </td>
                <td className="text-right text-sm">3 hours ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div >
  );
}

export default Pool;