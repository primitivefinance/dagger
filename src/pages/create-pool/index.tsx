import { useEffect, useState } from 'react';
import { balanceOf } from '../../lib/erc20';
import { useAccount } from 'wagmi';
import { isAddress } from 'viem';

function CreatePool() {
  const { address } = useAccount();

  const [strategy, setStrategy] = useState<'G3M' | 'LogNormal'>('G3M');
  const [tokenX, setTokenX] = useState<`0x${string}`>('0x9E4c7F96C883994ad0D6Ed690B68B2c53EF60048');
  const [tokenY, setTokenY] = useState<`0x${string}`>('0x935B7D29B20Fad7DF00eDE0D7F80Dc70F0AA8B75');
  const [weight, setWeight] = useState<number>(50);
  const [feeRate, setFeeRate] = useState<number>(0.3);
  const [controller, setController] = useState<string>('');
  const [reserveX, setReserveX] = useState<number>(0);
  const [reserveY, setReserveY] = useState<number>(0);
  const [pricePerX, setPricePerX] = useState<number>(0);
  const [pricePerY, setPricePerY] = useState<number>(0);
  const [balanceOfX, setBalanceOfX] = useState<number>(0);
  const [balanceOfY, setBalanceOfY] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenX, address);
        console.log(balance);
      }
    })();
  }, [address, tokenX]);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenY, address);
        console.log(balance);
      }
    })();
  }, [address, tokenY]);

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
                <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-4" />
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
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${strategy === 'G3M' ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setStrategy('G3M')}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-base font-bold">G3M</p>
              {strategy === 'G3M' && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Select the strategy you want to use with for this new pool.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${strategy === 'LogNormal' ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setStrategy('LogNormal')}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-base font-bold">LogNormal</p>
              {strategy === 'LogNormal' && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
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
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 0.01 ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(0.01)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">0.01%</p>
              {feeRate === 0.01 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for very stable pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 0.05 ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(0.05)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">0.05%</p>
              {feeRate === 0.05 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for stable pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 0.3 ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(0.3)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">0.30%</p>
              {feeRate === 0.3 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for most pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${feeRate === 1 ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setFeeRate(1)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">1.00%</p>
              {feeRate === 1 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
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

        <div className="flex flex-row gap-4 items-center">
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${weight === 20 ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setWeight(20)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">20/80%</p>
              {weight === 20 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for very stable pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${weight === 30 ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setWeight(30)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">30/70%</p>
              {weight === 30 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for stable pairs.</p>
          </div>
          <div
            className={`flex flex-col gap-1 p-3 rounded-lg border border-solid cursor-pointer hover:opacity-50 ${weight === 50 ? 'bg-dagger1 border-brand' : 'bg-dagger0 border-dagger2'}`}
            onClick={() => setWeight(50)}
          >
            <div className="flex flex-row items-center justify-between">
              <p className="text-sm font-bold">50/50%</p>
              {weight === 50 && (
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <p className="text-dagger3 text-xs">Best for most pairs.</p>
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Controller</p>
          <p className="text-dagger3 text-xs">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center bg-dagger1 border border-solid border-dagger2 text-sm p-3 w-full rounded-xl">
            <input value={controller} onChange={(e) => setController(e.target.value)} className="flex-grow" placeholder="Use an Ethereum address or an ENS..." />
            {isAddress(controller) ? (
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18 18 6m0 12L6 6" />
              </svg>
            )}
          </div>

          <button
            className="flex justify-end bg-transparent border-0"
            onClick={() => setController(address !== undefined ? address : '')}
          >
            Use my current wallet
          </button>
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
          <div className="flex flex-col justify-end text-right w-full">
            <p className="text-sm">Future price based on the pool parameters:</p>

            <p className="text-base font-bold">
              1,242 USDC <span className="text-xs font-normal">per ETH, </span> 0.0008 ETH <span className="text-xs font-normal">per USDC.</span>
            </p>
          </div>
        </div>

      </div>

      <button className="w-full text-base bg-brand border-0 p-4 font-bold text-dagger0">Connect Wallet</button>
    </div>
  );
}

export default CreatePool;