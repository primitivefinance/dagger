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
      <div className="container mx-auto my-8">
        <h1>Dagger</h1>
        <p>An online non-custodial asset management platform built on top of DFMM.</p>
      </div>
      <div className="container mx-auto my-8">
        <div className="flex flex-row items-center w-full justify-between">
          <h2>Active pools</h2>
          <a href="/create-pool" className="p-2 bg-[#000000] text-white">Create pool</a>
        </div>
        <table>
          <thead>
            <tr>
              <th className="normal-case">Composition</th>
              <th className="text-right normal-case">Strategy</th>
              <th className="text-right">TVL</th>
              <th className="text-right normal-case">Volume 24h</th>
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
                  WETH/USDC
                </div>
              </td>
              <td className="text-right p-0">G3M</td>
              <td className="text-right p-0">$2,324,245</td>
              <td className="text-right p-0">$1,324,535</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;