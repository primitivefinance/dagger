import { useIndexer } from "@/store/IndexerContext";
import { usePrices } from "@/store/PricesContext";
import { tokens } from "@/data/tokens";
import { title, subtitle } from "@/data/copy/home";
import { Link } from "react-router-dom";
import {
  Table,
  TableRow,
  TableHeader,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { useQuery } from "@tanstack/react-query";
import { allPoolsDocument } from "../../queries/all-pools";
import { request } from "graphql-request";

function Home() {
  const { pools } = useIndexer();
  const { state } = usePrices();
  const { prices } = state;

  const { data, error, isLoading } = useQuery({
    queryKey: ["pools"],
    queryFn: async () =>
      request(
        "https://dfmm-indexer-production-9708.up.railway.app/",
        allPoolsDocument,
        { limit: 10 }
      ),
  });

  console.log(data);
  console.log(error);
  console.log(isLoading);

  return (
    <>
      <div className="w-full pt-16 pb-6">
        <div className="container mx-auto max-w-4xl">
          <div className="gap-2 flex flex-col">
            <h1 className="font-bold scroll-m-20 text-3xl">{title}</h1>
            <h3 className="scroll-m-20 text-xl font-semibold">{subtitle}</h3>
          </div>
          <Separator className="my-4" />
        </div>
      </div>
      <div className="container mx-auto max-w-4xl gap-2 flex flex-col">
        <div className="flex flex-row items-center w-full justify-between">
          <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
            All Pools ({pools.length})
          </h3>
          <Button variant="secondary" asChild>
            <Link className="p-2" to="/create-pool">
              <div className="flex flex-row items-center gap-1">
                <svg
                  className="w-4 h-3 text-dagger4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 12h14m-7 7V5"
                  />
                </svg>
                Create pool
              </div>
            </Link>
          </Button>
        </div>
        <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Composition</TableHead>
                <TableHead className="text-right">TVL</TableHead>
                <TableHead className="text-right">Volume (24h)</TableHead>
                <TableHead className="text-right">Volume (1w)</TableHead>
                <TableHead className="text-right">Volume (1m)</TableHead>
                <TableHead className="text-right">Fees (24h)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pools.length > 0 &&
                pools.map((pool) => (
                  <TableRow
                    key={pool.id.toString()}
                    onClick={() =>
                      (location.href = `/pool/${pool.id.toString()}`)
                    }
                  >
                    <TableCell>
                      <div className="flex flex-row items-center gap-2">
                        <div className="flex flex-row items-center">
                          <img
                            src={
                              tokens.find(
                                (token) =>
                                  token.address.toLowerCase() ===
                                  pool.tokenX.id.toLowerCase()
                              )?.logo
                            }
                            alt={pool.tokenX.symbol}
                            className="rounded-full size-8"
                            style={{ zIndex: 1 }}
                          />
                          <img
                            src={
                              tokens.find(
                                (token) =>
                                  token.address.toLowerCase() ===
                                  pool.tokenY.id.toLowerCase()
                              )?.logo
                            }
                            alt={pool.tokenY.symbol}
                            className="rounded-full size-8"
                            style={{ marginLeft: "-8px" }}
                          />
                        </div>
                        <div className="flex flex-col font-bold">
                          {pool.tokenX.symbol}/{pool.tokenY.symbol}
                          <div className="flex flex-row gap-2">
                            <div className="bg-blue-600 px-2 rounded-full text-xs">
                              {pool.parameters.swapFee}%
                            </div>
                            <div className="bg-purple-600 px-2 rounded-full text-xs">
                              {pool.strategy.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      $
                      {(
                        pool.reserveX * prices[pool.tokenX.symbol] +
                        pool.reserveY * prices[pool.tokenY.symbol]
                      ).toLocaleString(undefined)}
                    </TableCell>
                    <TableCell className="text-right">$0.0</TableCell>
                    <TableCell className="text-right">$0.0</TableCell>
                    <TableCell className="text-right">$0.0</TableCell>
                    <TableCell className="text-right">$0.0</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default Home;
