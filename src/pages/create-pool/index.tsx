import { useState } from 'react';

function CreatePool() {
  const [strategy, setStrategy] = useState<string>('G3M');

  return (
    <div className="py-16 container mx-auto max-w-4xl gap-10 flex flex-col">

      <div className="flex flex-col gap-2">
        <h2 className="text-3xl">Create a new pool</h2>
        <h4 className="leading-tight text-dagger3 font-normal">
          Create a new pool requires you to provide liquidity to a pair of tokens.
        </h4>
      </div>

      <div className="grid grid-cols-[1fr_2fr] gap-8">


        <div className="flex flex-col">
          <p className="text-lg font-bold">Liquidity</p>
          <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
        </div>

        <div className="flex flex-col gap-4 items-start">
          <div className="grid grid-cols-2 border border-solid border-dagger2 p-3 rounded-xl gap-2 w-full">
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
          <div className="grid grid-cols-2 border border-solid border-dagger2 p-3 rounded-xl gap-2 w-full">
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
        </div>


        <div className="flex flex-col">
          <p className="text-lg font-bold">Pair</p>
          <p className="text-dagger3 text-xs">Select the tokens pair you want to provide liquidity with.</p>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <button>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                WETH
              </div>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9-7 7-7-7" />
              </svg>
            </div>
          </button>
          <button>
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-row gap-1 items-center">
                <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-4" />
                WETH
              </div>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9-7 7-7-7" />
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
            <p className="text-lg font-bold">G3M</p>
            <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${strategy === 'LogNormal' ? 'bg-dagger1 border-dagger2' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setStrategy('LogNormal')}
          >
            <p className="text-lg font-bold">LogNormal</p>
            <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Weights</p>
          <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
        </div>

        <div></div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Fee Rate</p>
          <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
        </div>

        <div>

        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Controller</p>
          <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
        </div>

        <div></div>

      </div>

      <button className="w-full">Connect Wallet</button>
    </div>
  );
}

export default CreatePool;