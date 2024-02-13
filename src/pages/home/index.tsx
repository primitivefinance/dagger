const FakePool = () => (
  <tr onClick={() => location.href = '/pool/0'}>
    <td>
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center">
          <img src="https://raw.githubusercontent.com/balancer/tokenlists/main/src/assets/images/tokens/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" alt="WETH" className="rounded-full size-8" style={{ zIndex: 1 }} />
          <img src="https://assets-cdn.trustwallet.com/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="USDC" className="rounded-full size-8" style={{ marginLeft: '-8px' }} />
        </div>
        <div className="flex flex-col font-bold">
          WETH/USDC
          <div className="flex flex-row gap-2">
            <div className="bg-blue-600 px-2 rounded-full text-xs">0.03%</div>
            <div className="bg-purple-600 px-2 rounded-full text-xs">G3M</div>
          </div>
        </div>
      </div>
    </td>
    <td className="text-right">$53.39m</td>
    <td className="text-right">$1.25m</td>
    <td className="text-right">$4.22m</td>
    <td className="text-right">$39.09m</td>
    <td className="text-right">$3.75k</td>
  </tr>
);

function Home() {
  return (
    <>
      <div className="w-full py-16">
        <div className="container mx-auto max-w-4xl">
          <div className="max-w-md gap-4 flex flex-col">
            <h1>Manage your funds lorem strategies.</h1>
            <h3 className="leading-tight text-dagger3 font-normal">
              Manage your funds onchain, stack too deep and you might get liquidated, stack too shallow and you might miss out on rewards.
            </h3>
          </div>
        </div>
      </div>
      <div className="container mx-auto max-w-4xl gap-2 flex flex-col">
        <div className="flex flex-row items-center w-full justify-between">
          <h3>All pools (42)</h3>
          <button className="p-2" onClick={() => location.href = '/create-pool'}>
            <div className="flex flex-row items-center gap-1">
              <svg className="w-4 h-3 text-dagger4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7 7V5" />
              </svg>
              Create pool
            </div>
          </button>
        </div>
        <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
          <table>
            <thead>
              <tr>
                <th className="text-left">Composition</th>
                <th className="text-right">TVL</th>
                <th className="text-right">Volume (24h)</th>
                <th className="text-right">Volume (1w)</th>
                <th className="text-right">Volume (1m)</th>
                <th className="text-right">Fees (24h)</th>
              </tr>
            </thead>
            <tbody>
              <FakePool />
              <FakePool />
              <FakePool />
              <FakePool />
              <FakePool />
              <FakePool />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;