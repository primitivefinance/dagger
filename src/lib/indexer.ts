export async function getPools(): Promise<Pool[]> {
  try {
    const query = await fetch('http://localhost:42069', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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
              parameters
              liquidity
              lpToken
              name
              reserveX
              reserveY
              strategy
              timestamp
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
