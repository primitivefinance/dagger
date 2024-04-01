import { useEffect, useState } from 'react'
import { useAccount, useConnect  } from 'wagmi'
import { formatEther, parseGwei, parseUnits } from "viem"
import CardToggleGroup from "@/components/CardRadioGroup"

import { balanceOf, allowance, approve } from "@/lib/erc20";
import TokenAmountInput from "@/components/TokenAmountInput";
import { computeAndFormatPrice, computePrice } from "@/lib/g3m";
import TokenSelector from "@/components/TokenSelector";
import { LogNormal, init, G3M, DFMM } from "@/lib/dfmm";
import { eth, tokens } from "@/data/tokens";

import {
  title,
  subtitle,
  tags,
  strats,
  feeLevels,
  weights,
} from "@/data/copy/swap";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePrices } from "@/store/PricesContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useBalance } from 'wagmi'
import { testnetClient } from '../../App';


const Swap = () => {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { prices } = usePrices().state;
  const { checkPrices } = usePrices();

  const ethBalance = useBalance({address})
  const [ethAmount, setEthAmount] = useState<string>('0')
  const [tokenOut, setTokenOut] = useState<number>(0)

  if(!address || !ethBalance?.data) return <></>
  return (
    <div className="py-16 container mx-auto max-w-2xl gap-14 flex flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <h4 className="leading-tight text-xl">{subtitle}</h4>
      </div>
      <Card>
        <div className="grid grid-cols-1">
          <div className="flex flex-row gap-4 items-center">
          <TokenAmountInput
            tokenAddress="0x0"
            tokenSymbol={'ETH'}
            tokenBalance={Number(formatEther(ethBalance.data.value).toString())}
            amount={ethAmount}
            setAmount={setEthAmount}
            tokenPrice={
              prices[eth.symbol]
            }
            tokenLogo={eth.logo}
          />
          </div>
          <div className="flex flex-row gap-4 items-center">
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Swap 