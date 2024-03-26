import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { parseEther, parseUnits } from "viem";
import CardToggleGroup from "@/components/CardRadioGroup";

import { balanceOf, allowance, approve } from "@/lib/erc20";
import TokenAmountInput from "@/components/TokenAmountInput";
import { computeAndFormatPrice, computePrice } from "@/lib/g3m";
import TokenSelector from "@/components/TokenSelector";
import { LogNormal, init, G3M, DFMM } from "@/lib/dfmm";
import { tokens } from "@/data/tokens";
import {
  title,
  subtitle,
  tags,
  strats,
  feeLevels,
  weights,
} from "@/data/copy/create-pool";
import { usePrices } from "@/store/PricesContext";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";

function CreatePool() {
  const { address } = useAccount();
  const { connectors, connect } = useConnect();
  const { prices } = usePrices().state;
  const { checkPrices } = usePrices();

  const [strategy, setStrategy] = useState(strats[0].value);
  const [feeRate, setFeeRate] = useState(feeLevels[0].value);
  const [weight, setWeight] = useState(weights[0].value);

  const [tokenX, setTokenX] = useState<`0x${string}`>(tokens[4].address);
  const [tokenY, setTokenY] = useState<`0x${string}`>(tokens[3].address);
  const [controller, setController] = useState<string>("");
  const [reserveX, setReserveX] = useState<string>("");
  const [reserveY, setReserveY] = useState<string>("");
  const [tokenXBalance, setTokenXBalance] = useState<number>(0);
  const [tokenYBalance, setTokenYBalance] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenX, address);
        setTokenXBalance(balance);
        checkPrices(_tokenX.symbol); // add whenever we NEED to check prices
      }
    })();
  }, [address, tokenX]);

  useEffect(() => {
    (async () => {
      if (address) {
        const balance = await balanceOf(tokenY, address);
        setTokenYBalance(balance);
        checkPrices(_tokenY.symbol);
      }
    })();
  }, [address, tokenY]);

  const _tokenX = tokens.find((token) => token.address === tokenX)!;
  const _tokenY = tokens.find((token) => token.address === tokenY)!;

  return (
    <div className="py-16 container mx-auto max-w-6xl gap-14 flex flex-col">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-semibold">{title}</h2>
        <h4 className="leading-tight text-xl">{subtitle}</h4>
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
            tokenLogo={
              tokens.find((token) => token.address === tokenX)?.logo || ""
            }
            tokenSymbol={
              tokens.find((token) => token.address === tokenX)?.symbol || ""
            }
            setToken={setTokenX}
          />
          <TokenSelector
            tokenLogo={
              tokens.find((token) => token.address === tokenY)?.logo || ""
            }
            tokenSymbol={
              tokens.find((token) => token.address === tokenY)?.symbol || ""
            }
            setToken={setTokenY}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{tags[1].title}</CardTitle>
            <CardDescription>{tags[1].sub}</CardDescription>
          </CardHeader>
        </Card>
        <CardToggleGroup
          options={strats}
          value={strategy}
          setValue={setStrategy}
        />

        <Card>
          <CardHeader>
            <CardTitle>{tags[2].title}</CardTitle>
            <CardDescription>{tags[2].sub}</CardDescription>
          </CardHeader>
        </Card>
        <CardToggleGroup
          options={feeLevels}
          value={feeRate}
          setValue={setFeeRate}
        />

        <Card>
          <CardHeader>
            <CardTitle>{tags[3].title}</CardTitle>
            <CardDescription>{tags[3].sub}</CardDescription>
          </CardHeader>
        </Card>
        <CardToggleGroup
          options={weights}
          value={weight}
          setValue={setWeight}
        />

        <Card>
          <CardHeader>
            <CardTitle>{tags[4].title}</CardTitle>
            <CardDescription>{tags[4].sub}</CardDescription>
          </CardHeader>
        </Card>

        <div className="grid w-full items-center gap-1">
          <Label className="text-sm font-semibold">Controller address</Label>
          <Input
            value={controller}
            onChange={(e) => setController(e.target.value)}
            placeholder="Use an Ethereum address or an ENS name..."
          />
          <div className="w-full flex justify-end -my-2">
            <Button
              variant="link"
              className="p-0"
              onClick={() =>
                setController(address !== undefined ? address : "")
              }
            >
              Use my current wallet address
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{tags[5].title}</CardTitle>
            <CardDescription>{tags[5].sub}</CardDescription>
          </CardHeader>
        </Card>

        <div className="flex flex-col gap-4 items-start">
          <TokenAmountInput
            tokenAddress={
              tokens.find((token) => token.address === tokenX)!.address
            }
            tokenSymbol={
              tokens.find((token) => token.address === tokenX)!.symbol
            }
            tokenBalance={tokenXBalance}
            amount={reserveX}
            setAmount={setReserveX}
            tokenPrice={
              prices[tokens.find((token) => token.address === tokenX)!.symbol]
            }
            tokenLogo={tokens.find((token) => token.address === tokenX)!.logo}
          />

          <TokenAmountInput
            tokenAddress={
              tokens.find((token) => token.address === tokenY)!.address
            }
            tokenSymbol={
              tokens.find((token) => token.address === tokenY)!.symbol
            }
            tokenBalance={tokenYBalance}
            amount={reserveY}
            setAmount={setReserveY}
            tokenPrice={
              prices[tokens.find((token) => token.address === tokenX)!.symbol]
            }
            tokenLogo={tokens.find((token) => token.address === tokenY)!.logo}
          />

          <div className="flex flex-col justify-end text-right w-full px-3">
            <p className="text-sm">Price based on the given pool parameters:</p>

            <p className="text-base font-bold">
              {computeAndFormatPrice(
                parseFloat(reserveX),
                parseFloat(reserveY),
                Number(weight) / 100,
                (100 - Number(weight)) / 100
              )}{" "}
              {_tokenY.symbol}{" "}
              <span className="text-xs font-normal">
                per {_tokenX.symbol},{" "}
              </span>{" "}
              {computeAndFormatPrice(
                parseFloat(reserveY),
                parseFloat(reserveX),
                (100 - Number(weight)) / 100,
                Number(weight) / 100
              )}{" "}
              {_tokenX.symbol}{" "}
              <span className="text-xs font-normal">per {_tokenY.symbol}.</span>
            </p>
          </div>
        </div>
      </div>

      <Button
        variant="default"
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
              strategy === "G3M" ? G3M : LogNormal,
              tokenX,
              tokenY,
              parseUnits(reserveX, _tokenX.decimals),
              parseEther(
                computePrice(
                  parseFloat(reserveX),
                  parseFloat(reserveY),
                  Number(weight) / 100,
                  (100 - Number(weight)) / 100
                ).toString()
              ),
              parseEther((Number(weight) / 100).toString()),
              parseEther((Number(feeRate) / 100).toString()),
              controller as `0x${string}`
            );

            console.log(result);
          }
        }}
      >
        {address === undefined ? "Connect Wallet" : "Create Pool"}
      </Button>
    </div>
  );
}

export default CreatePool;
