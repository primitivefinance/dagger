import { useEffect } from "react";
import { useAccount } from "wagmi";
import { getNonce } from "../../services/dfmm";

function Home() {
  const account = useAccount();

  useEffect(() => {
    (async () => {
      console.log(account);

      if (account.isConnected) {
        console.log(await getNonce());
      } else {
        console.log("Not connected");
      }
    })();
  }, [account.isConnected]);

  return (
    <>
      <div className="container mx-auto my-16 max-w-6xl">
        <div className="max-w-md gap-4 flex flex-col">
          <h1 className="leading-none">Manage your funds lorem strategies.</h1>
          <p className="leading-tight">
            Manage your funds onchain, stack too deep and you might get liquidated, stack too shallow and you might miss out on rewards.
          </p>
        </div>
      </div>
      <div className="container mx-auto my-8 max-w-6xl">
        <div className="flex flex-row items-center w-full justify-between">
          <h3>All pools (42)</h3>
          <a href="/create-pool" className="p-2 bg-[#000000] text-white">Create pool</a>
        </div>
        <table>
          <thead>
            <tr>
              <th className="normal-case">Composition</th>
              <th className="text-right">TVL</th>
              <th className="text-right normal-case">Volume (24h)</th>
              <th className="text-right normal-case">Volume (1w)</th>
              <th className="text-right normal-case">Volume (1m)</th>
              <th className="text-right normal-case">Fees (24h)</th>
            </tr>
          </thead>
          <tbody style={{ borderTopWidth: '1px' }}>
            <tr>
              <td>
                <div className="flex flex-row items-center gap-2">
                  <div className="flex flex-row items-center">
                    <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-8" style={{ zIndex: 1 }} />
                    <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-8" style={{ marginLeft: '-8px' }} />
                  </div>
                  <div className="flex flex-col">
                    WETH/USDC
                    <div className="flex flex-row gap-2">
                      <div className="text-white bg-gray-400 px-2 rounded-full text-[14px]">0.03%</div>
                      <div className="text-white bg-gray-400 px-2 rounded-full text-[14px]">G3M</div>
                    </div>
                  </div>
                </div>
              </td>
              <td className="text-right p-0">$53.39m</td>
              <td className="text-right p-0">$1.25m</td>
              <td className="text-right p-0">$4.22m</td>
              <td className="text-right p-0">$39.09m</td>
              <td className="text-right p-0">$3.75k</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;