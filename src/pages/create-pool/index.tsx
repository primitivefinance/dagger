import { useEffect, useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { isAddress, parseEther, parseUnits } from 'viem';

import { balanceOf, allowance, approve } from '@/lib/erc20';
import TokenAmountInput from '@/components/TokenAmountInput';
import PoolConfigCard from '@/components/Card';
import { computeAndFormatPrice, computePrice } from '@/lib/g3m';
import TokenSelector from '@/components/TokenSelector';
import { LogNormal, init, G3M, DFMM } from '@/lib/dfmm';
import { tokens } from '@/data/tokens';
import { title, subtitle, tags, strats, feeLevels, weights } from '@/data/copy/create-pool'
import { usePrices } from '@/store/PricesContext';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function CreatePool() {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { prices } = usePrices().state;
  const { checkPrices } = usePrices()

  const [strategy, setStrategy] = useState<'G3M' | 'LogNormal'>('G3M');
  const [tokenX, setTokenX] = useState<`0x${string}`>(tokens[4].address);
  const [tokenY, setTokenY] = useState<`0x${string}`>(tokens[3].address);
  const [weight, setWeight] = useState<number>(50);
  const [feeRate, setFeeRate] = useState<number>(0.3);
  const [controller, setController] = useState<string>('');
  const [reserveX, setReserveX] = useState<string>('');
  const [reserveY, setReserveY] = useState<string>('');
  const [tokenXBalance, setTokenXBalance] = useState<number>(0);
  const [tokenYBalance, setTokenYBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenX, address);
        setTokenXBalance(balance);
        checkPrices(_tokenX.symbol) // add whenever we NEED to check prices
      }
    })();
  }, [address, tokenX]);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenY, address);
        setTokenYBalance(balance);
        checkPrices(_tokenY.symbol)
      }
    })();
  }, [address, tokenY]);

  const _tokenX = tokens.find((token) => token.address === tokenX)!;
  const _tokenY = tokens.find((token) => token.address === tokenY)!;

  return (
    <div className="py-16 container mx-auto max-w-4xl gap-14 flex flex-col">

      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <h4 className="leading-tight text-xl">
          {subtitle}
        </h4>
      </div>
      <div className="grid grid-cols-[1fr_2fr] gap-x-14 gap-y-8">
        <Card>
          <CardHeader>
          <CardTitle>{tags[0].title}</CardTitle>
          <CardDescription>{tags[0].sub}</CardDescription>
          </CardHeader>
        </Card>

        <div className="flex flex-row gap-4 items-center">
          <TokenSelector
            tokenLogo={tokens.find((token) => token.address === tokenX)?.logo || ''}
            tokenSymbol={tokens.find((token) => token.address === tokenX)?.symbol || ''}
            setToken={setTokenX}
          />
          <TokenSelector
            tokenLogo={tokens.find((token) => token.address === tokenY)?.logo || ''}
            tokenSymbol={tokens.find((token) => token.address === tokenY)?.symbol || ''}
            setToken={setTokenY}
          />
        </div>

        <Card>
          <CardHeader>
          <CardTitle>{tags[1].title}</CardTitle>
          <CardDescription>{tags[1].sub}</CardDescription>
          </CardHeader>
        </Card>

        <div className="flex flex-row gap-4 items-center">
          <PoolConfigCard
            isSelected={strategy === 'G3M'}
            onClick={() => setStrategy('G3M')}
            title={strats[0].title}
            description={strats[0].sub}
          />
          <PoolConfigCard
            isSelected={strategy === 'LogNormal'}
            onClick={() => setStrategy('LogNormal')}
            title={strats[1].title}
            description={strats[1].sub}
          />
        </div>

        <Card>
          <CardHeader>
          <CardTitle>{tags[2].title}</CardTitle>
          <CardDescription>{tags[2].sub}</CardDescription>
          </CardHeader>
        </Card>

        <div className="flex flex-row gap-4 items-center">
          <PoolConfigCard
            isSelected={feeRate === 0.01}
            onClick={() => setFeeRate(0.01)}
            title={feeLevels[0].title}
            description={feeLevels[0].sub}
            smallTitle
          />
          <PoolConfigCard
            isSelected={feeRate === 0.05}
            onClick={() => setFeeRate(0.05)}
            title={feeLevels[1].title}
            description={feeLevels[1].sub}
            smallTitle
          />
          <PoolConfigCard
            isSelected={feeRate === 0.3}
            onClick={() => setFeeRate(0.3)}
            title={feeLevels[2].title}
            description={feeLevels[2].sub}
            smallTitle
          />
          <PoolConfigCard
            isSelected={feeRate === 1}
            onClick={() => setFeeRate(1)}
            title={feeLevels[3].title}
            description={feeLevels[3].sub}
            smallTitle
          />
        </div>


        <Card>
          <CardHeader>
          <CardTitle>{tags[3].title}</CardTitle>
          <CardDescription>{tags[3].sub}</CardDescription>
          </CardHeader>
        </Card>


        <div className="flex flex-row gap-4 items-center">
          <PoolConfigCard
            isSelected={weight === 20}
            onClick={() => setWeight(20)}
            title={weights[0].title}
            description={weights[0].sub}
            smallTitle
          />
          <PoolConfigCard
            isSelected={weight === 30}
            onClick={() => setWeight(30)}
            title={weights[1].title}
            description={weights[1].sub}
            smallTitle
          />
          <PoolConfigCard
            isSelected={weight === 50}
            onClick={() => setWeight(50)}
            title={weights[2].title}
            description={weights[2].sub}
            smallTitle
          />
        </div>

        <Card>
          <CardHeader>
          <CardTitle>{tags[4].title}</CardTitle>
          <CardDescription>{tags[4].sub}</CardDescription>
          </CardHeader>
        </Card>


        <div className="flex flex-col">
          <div className="flex flex-row justify-between items-center bg-dagger1 border border-solid border-dagger2 text-sm p-3 w-full rounded-xl">
            <input value={controller} onChange={(e) => setController(e.target.value)} className="flex-grow" placeholder="Use an Ethereum address or an ENS name..." />
            {isAddress(controller) ? (
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="green" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18 18 6m0 12L6 6" />
              </svg>
            )}
          </div>

          <button
            className="flex justify-end bg-transparent border-0"
            onClick={() => setController(address !== undefined ? address : '')}
          >
            Use my current wallet address
          </button>
        </div>


        <Card>
          <CardHeader>
          <CardTitle>{tags[5].title}</CardTitle>
          <CardDescription>{tags[5].sub}</CardDescription>
          </CardHeader>
        </Card>


        <div className="flex flex-col gap-4 items-start">

          <TokenAmountInput
            tokenAddress={tokens.find((token) => token.address === tokenX)!.address}
            tokenSymbol={tokens.find((token) => token.address === tokenX)!.symbol}
            tokenBalance={tokenXBalance}
            amount={reserveX}
            setAmount={setReserveX}
            tokenPrice={prices[tokens.find((token) => token.address === tokenX)!.symbol]}
            tokenLogo={tokens.find((token) => token.address === tokenX)!.logo}
          />

          <TokenAmountInput
            tokenAddress={tokens.find((token) => token.address === tokenY)!.address}
            tokenSymbol={tokens.find((token) => token.address === tokenY)!.symbol}
            tokenBalance={tokenYBalance}
            amount={reserveY}
            setAmount={setReserveY}
            tokenPrice={prices[tokens.find((token) => token.address === tokenX)!.symbol]}
            tokenLogo={tokens.find((token) => token.address === tokenY)!.logo}
          />

          <div className="flex flex-col justify-end text-right w-full px-3">
            <p className="text-sm">Price based on the given pool parameters:</p>

            <p className="text-base font-bold">
              {computeAndFormatPrice(parseFloat(reserveX), parseFloat(reserveY), weight / 100, (100 - weight) / 100)} {_tokenY.symbol} <span className="text-xs font-normal">per {_tokenX.symbol}, </span> {computeAndFormatPrice(parseFloat(reserveY), parseFloat(reserveX), (100 - weight) / 100, weight / 100)} {_tokenX.symbol} <span className="text-xs font-normal">per {_tokenY.symbol}.</span>
            </p>
          </div>
        </div>

      </div>

      <button
        className="w-full text-base bg-brand border-0 p-4 font-bold text-dagger0"
        onClick={async () => {
          if (address === undefined) {
            connect({ connector: connectors[0] });
          } else {
            const allowanceX = await allowance(tokenX, address, DFMM);

            if (allowanceX === 0) {
              await approve(tokenX, DFMM);
            }

            const allowanceY = await allowance(tokenY, address, DFMM);

            if (allowanceY === 0) {
              await approve(tokenY, DFMM);
            }

            const result = await init(
              strategy === 'G3M' ? G3M : LogNormal,
              tokenX,
              tokenY,
              parseUnits(reserveX, _tokenX.decimals),
              parseEther(computePrice(parseFloat(reserveX), parseFloat(reserveY), weight / 100, (100 - weight) / 100).toString()),
              parseEther((weight / 100).toString()),
              parseEther((feeRate / 100).toString()),
              controller as `0x${string}`,
            );

            console.log(result);
          }
        }}
      >
        {address === undefined ? 'Connect Wallet' : 'Create Pool'}
      </button>
    </div>
  );
}

export default CreatePool;
