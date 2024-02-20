
const indexer: string = import.meta.env.VITE_DFMM_INDEXER ? import.meta.env.VITE_DFMM_INDEXER : 'http://localhost:42069'

export async function getPools(): Promise<Pool[]> {
  try {
    const query = await fetch(indexer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': indexer,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          pools(limit: 10) {
            items {
              id
              tokenX {
                symbol
                decimals
                id
                name
              }
              tokenY {
                symbol
                decimals
                id
                name
              }
              liquidity
              lpToken
              name
              reserveY
              timestamp
              reserveXWad
              reserveYWad
              parameters {
                controller
                swapFee
                swapFeeWad
                weightX
                weightXWad
                weightY
                weightYWad
              }
              reserveX
              strategyId
              strategy {
                name
              }
              positions {
                items {
                  accountId
                  liquidity
                  liquidityWad
                }
              }
            }
          }
        }
        `
      }),
    });

    const json = await query.json();
    return json.data.pools.items;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch pools');
  }
}

export async function getUserPositions(account: `0x${string}`): Promise<Position[]> {
  try {
    const query = await fetch(indexer, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': indexer,
      },
      body: JSON.stringify({
        query: `
        query MyQuery {
          positions(where: {accountId: "${account}"}) {
            items {
              liquidity
              liquidityWad
              id
              poolId
              pool {
                liquidity
                liquidityWad
                name
                id
                lpToken
                reserveX
                reserveXWad
                reserveY
                reserveYWad
                strategyId
                strategy {
                  name
                }
                parameters {
                  swapFee
                }
                tokenX {
                  decimals
                  id
                  name
                  symbol
                }
                tokenY {
                  decimals
                  id
                  name
                  symbol
                }
              }
            }
          }
        }
        `
      }),
    });

    const json = await query.json();
    return json.data.positions.items;
  } catch (e) {
    console.error(e);
    throw new Error('Failed to fetch positions');
  }
}
