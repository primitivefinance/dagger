import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { isAddress } from 'viem';

import { balanceOf } from '../../lib/erc20';
import TokenAmountInput from '../../components/TokenAmountInput';
import Card from '../../components/Card';
import { computeAndFormatPrice } from '../../lib/g3m';

function CreatePool() {
  const { address } = useAccount();

  const [strategy, setStrategy] = useState<'G3M' | 'LogNormal'>('G3M');
  const [tokenX, setTokenX] = useState<`0x${string}`>('0x9E4c7F96C883994ad0D6Ed690B68B2c53EF60048');
  const [tokenY, setTokenY] = useState<`0x${string}`>('0x935B7D29B20Fad7DF00eDE0D7F80Dc70F0AA8B75');
  const [weight, setWeight] = useState<number>(50);
  const [feeRate, setFeeRate] = useState<number>(0.3);
  const [controller, setController] = useState<string>('');
  const [reserveX, setReserveX] = useState<string>('');
  const [reserveY, setReserveY] = useState<string>('');
  const [pricePerX, setPricePerX] = useState<number>(0);
  const [pricePerY, setPricePerY] = useState<number>(0);
  const [tokenXBalance, setTokenXBalance] = useState<number>(0);
  const [tokenYBalance, setTokenYBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenX, address);
        setTokenXBalance(balance);
      }
    })();
  }, [address, tokenX]);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenY, address);
        setTokenYBalance(balance);
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
          <Card
            isSelected={strategy === 'G3M'}
            onClick={() => setStrategy('G3M')}
            title="G3M"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          />
          <Card
            isSelected={strategy === 'LogNormal'}
            onClick={() => setStrategy('LogNormal')}
            title="LogNormal"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
          />
        </div>

        <div className="flex flex-col">
          <p className="text-lg font-bold">Fee Rate</p>
          <p className="text-dagger3 text-xs">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Card
            isSelected={feeRate === 0.01}
            onClick={() => setFeeRate(0.01)}
            title="0.01%"
            description="Best for very stable pairs."
            smallTitle
          />
          <Card
            isSelected={feeRate === 0.05}
            onClick={() => setFeeRate(0.05)}
            title="0.05%"
            description="Best for stable pairs."
            smallTitle
          />
          <Card
            isSelected={feeRate === 0.3}
            onClick={() => setFeeRate(0.3)}
            title="0.30%"
            description="Best for most pairs."
            smallTitle
          />
          <Card
            isSelected={feeRate === 1}
            onClick={() => setFeeRate(1)}
            title="1.00%"
            description="Best for exotic pairs."
            smallTitle
          />
        </div>


        <div className="flex flex-col">
          <p className="text-lg font-bold">Weights</p>
          <p className="text-dagger3 text-xs">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <Card
            isSelected={weight === 20}
            onClick={() => setWeight(20)}
            title="20/80%"
            description="Best for very stable pairs."
            smallTitle
          />
          <Card
            isSelected={weight === 30}
            onClick={() => setWeight(30)}
            title="30/70%"
            description="Best for stable pairs."
            smallTitle
          />
          <Card
            isSelected={weight === 50}
            onClick={() => setWeight(50)}
            title="50/50%"
            description="Best for most pairs."
            smallTitle
          />
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

          <TokenAmountInput
            tokenAddress="0x9E4c7F96C883994ad0D6Ed690B68B2c53EF60048"
            tokenSymbol="WETH"
            tokenBalance={tokenXBalance}
            amount={reserveX}
            setAmount={setReserveX}
            tokenPrice={2700}
            tokenLogo={"https://assets.smold.app/api/token/1/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo-128.png"}
          />

          <TokenAmountInput
            tokenAddress="0x935B7D29B20Fad7DF00eDE0D7F80Dc70F0AA8B75"
            tokenSymbol="USDC"
            tokenBalance={tokenYBalance}
            amount={reserveY}
            setAmount={setReserveY}
            tokenPrice={1}
            tokenLogo={"https://assets.smold.app/api/token/1/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo-128.png"}
          />

          <div className="flex flex-col justify-end text-right w-full px-3">
            <p className="text-sm">Future price based on the pool parameters:</p>

            <p className="text-base font-bold">
              {computeAndFormatPrice(parseFloat(reserveX), parseFloat(reserveY), weight / 100, (100 - weight) / 100)} USDC <span className="text-xs font-normal">per ETH, </span> {computeAndFormatPrice(parseFloat(reserveY), parseFloat(reserveX), (100 - weight) / 100, weight / 100)} ETH <span className="text-xs font-normal">per USDC.</span>
            </p>
          </div>
        </div>

      </div>

      <button
        className="w-full text-base bg-brand border-0 p-4 font-bold text-dagger0"
      >
        Connect Wallet
      </button>
    </div>
  );
}

export default CreatePool;