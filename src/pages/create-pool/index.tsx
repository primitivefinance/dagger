import { useState, useRef } from 'react';

function CreatePool() {
  const [strategy, setStrategy] = useState<string>('G3M');
  const [weight, setWeight] = useState<number>(50);
  const [feeRate, setFeeRate] = useState<number>(0.3);
  const ref = useRef(null);

  return (
    <div className="py-16 container mx-auto max-w-4xl gap-14 flex flex-col">

      <div className="flex flex-col gap-2">
        <h2 className="text-3xl">Create a new pool</h2>
        <h4 className="leading-tight text-dagger3 font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </h4>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-x-14 gap-y-8">

        <div className="flex flex-col">
          <p className="text-lg font-bold">Pair</p>
          <p className="text-dagger3 text-xs">Select the tokens pair you want to provide liquidity with.</p>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <button>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                <span className="text-base">WETH</span>
              </div>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9-7 7-7-7" />
              </svg>
            </div>
          </button>
          <button>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="WETH" className="rounded-full size-4" />
                <span className="text-base">USDC</span>
              </div>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Strategy</p>
          <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${strategy === 'G3M' ? 'bg-dagger1 border-dagger2' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setStrategy('G3M')}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-base font-bold">G3M</p>
              {strategy === 'G3M' && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clip-rule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${strategy === 'LogNormal' ? 'bg-dagger1 border-dagger2' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setStrategy('LogNormal')}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-base font-bold">LogNormal</p>
              {strategy === 'LogNormal' && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clip-rule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Fee Rate</p>
          <p className="text-dagger3 text-xs">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 0.01 ? 'bg-dagger1 border-dagger2' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(0.01)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">0.01%</p>
              {feeRate === 0.01 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clip-rule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for very stable pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 0.05 ? 'bg-dagger1 border-dagger2' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(0.05)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">0.05%</p>
              {feeRate === 0.05 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clip-rule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for stable pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 0.3 ? 'bg-dagger1 border-dagger2' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(0.3)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">0.30%</p>
              {feeRate === 0.3 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clip-rule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for most pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 1 ? 'bg-dagger1 border-dagger2' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(1)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">1.00%</p>
              {feeRate === 1 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clip-rule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for exotic pairs.</p>
          </div>
        </div>


        <div className="flex flex-col">
          <p className="text-lg font-bold">Weights</p>
          <p className="text-dagger3 text-xs">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div>
          <div className="w-full h-3 bg-white rounded-full">
            <div className="h-full bg-dagger1" style={{ width: `${weight}%` }} />
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-1">
              <input placeholder="50" />
              <p className="font-bold">% WETH</p>
            </div>
            <div className="flex flex-row gap-1">
              <input placeholder="50" />
              <p className="font-bold">% USDC</p>
            </div>
          </div>
          <div className="grid grid-cols-2">
            <p className="font-bold">
              {weight}% WETH
            </p>
            <p className="font-bold text-right">
              {100 - weight}% USDC
            </p>
            <input
              ref={ref}
              type="range"
              className="col-span-2 appearance-none bg-dagger2 rounded-full cursor-pointer h-1 w-full"
              step={1}
              min={1}
              max={99}
              onChange={(e) => setWeight(parseInt(e.target.value, 10))}
              value={weight}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Controller</p>
          <p className="text-dagger3 text-xs">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>

        <div className="flex flex-col justify-end">
          <input
            className="border border-solid border-dagger2 text-sm p-3 w-full rounded-xl"
            placeholder="Use an Ethereum address or an ENS..."
          />
          <button className="bg-transparent border-0">Use my current wallet (0xbeef...cafe)</button>
        </div>


        <div className="flex flex-col">
          <p className="text-lg font-bold">Liquidity</p>
          <p className="text-dagger3 text-xs">Select the assets and the quantity of liquidity you want to provide in the pool.</p>
        </div>

        <div className="flex flex-col gap-4 items-start">

          <div className="grid grid-cols-2 border border-solid border-dagger2 p-3 rounded-xl gap-2 w-full">
            <input className="text-lg" placeholder="0.0" />
            <div className="flex flex-row items-center justify-end">
              <button>
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex flex-row gap-1 items-center">
                    <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                    <span className="text-sm font-bold">WETH</span>
                  </div>
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>
            <p className="text-sm text-dagger3">$0.0</p>
            <button className="p-0 border-0 hover:opacity-100 bg-transparent">
              <div className="flex flex-row gap-1 justify-end items-center group">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path className="text-dagger3 group-hover:text-dagger4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z" />
                </svg>
                <p className="text-sm text-dagger3 group-hover:text-dagger4">
                  1.525 WETH
                </p>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-2 border border-solid border-dagger2 p-3 rounded-xl gap-2 w-full">
            <input className="text-lg" placeholder="0.0" />
            <div className="flex flex-row items-center justify-end">
              <button>
                <div className="flex flex-row gap-2 items-center">
                  <div className="flex flex-row gap-1 items-center">
                    <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="WETH" className="rounded-full size-4" />
                    <span className="text-sm font-bold">USDC</span>
                  </div>
                  <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m19 9-7 7-7-7" />
                  </svg>
                </div>
              </button>
            </div>
            <p className="text-sm text-dagger3">$0.0</p>
            <button className="p-0 border-0 hover:opacity-100 bg-transparent">
              <div className="flex flex-row gap-1 justify-end items-center group">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <path className="text-dagger3 group-hover:text-dagger4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 8H5m12 0c.6 0 1 .4 1 1v2.6M17 8l-4-4M5 8a1 1 0 0 0-1 1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1v-2.6M5 8l4-4 4 4m6 4h-4a2 2 0 1 0 0 4h4c.6 0 1-.4 1-1v-2c0-.6-.4-1-1-1Z" />
                </svg>
                <p className="text-sm text-dagger3 group-hover:text-dagger4">
                  2,415.52 USDC
                </p>
              </div>
            </button>
          </div>

        </div>

      </div>

      <button className="w-full text-base">Connect Wallet</button>
    </div>
  );
}

export default CreatePool;