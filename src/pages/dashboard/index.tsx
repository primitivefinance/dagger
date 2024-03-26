import { tokens } from "@/data/tokens";
import { useIndexer } from "@/store/IndexerContext";
import { usePrices } from "@/store/PricesContext";
import { Link } from 'react-router-dom';
import { Table, TableRow, TableHeader, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function Dashboard() {
  const { userPositions } = useIndexer();
  const { prices } = usePrices().state;

  return (
    <div className="container mx-auto max-w-4xl gap-2 flex flex-col my-12">
      <div className="flex flex-row items-center w-full justify-between">
        <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">My Positions ({userPositions.length})</h3>
        <Button variant="secondary" asChild>
          <Link to="/">
            <svg className="w-4 h-3 text-dagger4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 12h14m-7 7V5" />
            </svg>
            Browse pools
          </Link>
        </Button>
      </div>
      <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-left">Pool</TableHead>
              <TableHead className="text-right">Value</TableHead>
              <TableHead className="text-right">TVL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userPositions.length > 0 && userPositions.map((position) => (
              <TableRow key={position.pool.id.toString()} onClick={() => location.href = `/pool/${position.pool.id.toString()}`}>
                <TableCell>
                  <div className="flex flex-row items-center gap-2">
                    <div className="flex flex-row items-center">
                      <img
                        src={tokens.find(token => token.address.toLowerCase() === position.pool.tokenX.id.toLowerCase())?.logo}
                        alt={position.pool.tokenX.symbol}
                        className="rounded-full size-8" style={{ zIndex: 1 }}
                      />
                      <img
                        src={tokens.find(token => token.address.toLowerCase() === position.pool.tokenY.id.toLowerCase())?.logo}
                        alt={position.pool.tokenY.symbol}
                        className="rounded-full size-8"
                        style={{ marginLeft: '-8px' }}
                      />
                    </div>
                    <div className="flex flex-col font-bold">
                      {position.pool.tokenX.symbol}/{position.pool.tokenY.symbol}
                      <div className="flex flex-row gap-2">
                        <div className="bg-blue-600 px-2 rounded-full text-xs">{position.pool.parameters.swapFee}%</div>
                        <div className="bg-purple-600 px-2 rounded-full text-xs">{position.pool.strategy.name}</div>
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">${(position.pool.reserveX * position.liquidity / position.pool.liquidity * prices[position.pool.tokenX.symbol] + position.pool.reserveY * position.liquidity / position.pool.liquidity * prices[position.pool.tokenY.symbol]).toLocaleString(undefined)}</TableCell>
                <TableCell className="text-right">${(position.pool.reserveX * prices[position.pool.tokenX.symbol] + position.pool.reserveY * prices[position.pool.tokenY.symbol]).toLocaleString(undefined)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;
