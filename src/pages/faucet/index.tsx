import { useAccount } from 'wagmi';

import { tokens } from '../../data/tokens';
import { mint } from '../../lib/erc20';

function Faucet() {
  const { address } = useAccount();

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center max-w-sm m-auto py-8">
      {tokens.map(token => (
        <button
          key={token.address}
          onClick={async () => await mint(token.address, address!, token.faucet!, token.decimals)}
        >
          <div className="flex flex-row gap-1 items-center">
            <img src={token.logo} alt={token.symbol} className="rounded-full size-4" />
            Mint {token.symbol}
          </div>
        </button>
      ))}
    </div>
  );
}

export default Faucet;