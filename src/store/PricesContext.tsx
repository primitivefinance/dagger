import { createContext, useState } from 'react';
import { useReducer, useContext, useEffect } from 'react';

import { tokens } from '../data/tokens';

const prices: { [key: string]: number } = {
  'WETH': 3000,
  'USDC': 1,
  'USDT': 1,
  'DAI': 1,
  'WBTC': 52000,
};

type Action = {
  type: 'SET_PRICE';
  id: string;
  price: number;
}

type PricesContextState = {
  prices: {
    [key: string]: number;
  },
}

const initialIndexerState: PricesContextState = {
  prices: {},
};

export const PricesContext = createContext<{
  state: PricesContextState,
  dispatch: React.Dispatch<Action>,
  checkPrices: (assetTicker:string) => void,
}>({
  dispatch: () => null,
  state: initialIndexerState,
  checkPrices: () => null,
});

function pricesReducer(state: PricesContextState, action: Action): PricesContextState {
  switch (action.type) {
    case 'SET_PRICE':
      const newPrices = { ...state };
      newPrices.prices[action.id] = action.price;
      return { ...newPrices };
    default:
      throw new Error('Invalid action');
  }
}

type PricesProviderProps = {
  children: React.ReactNode;
}

export function PricesProvider(props: PricesProviderProps) {
  const [state, dispatch] = useReducer(pricesReducer, initialIndexerState);
  const [check, setCheck] = useState('')

  const checkPrices = (assetTicker:string) => {
    setCheck(assetTicker)
  }

  useEffect(() => {
    async function fetchPrices() {
      for (let i = 0; i < tokens.length; i++) {
        const res = await fetch(`https://api.dexscreener.com/latest/dex/search?q=${check}`);
        const data = await res.json();

        if (data && data.pairs && data.pairs.length > 0) {
          const average = data.pairs.reduce((acc: any, pair: any) => acc + parseFloat(pair.priceUsd), 0) / data.pairs.length;
          dispatch({ type: 'SET_PRICE', id: check, price: average });
        }
      }
    }

    fetchPrices();

    for (let i = 0; i < Object.keys(prices).length; i++) {
      const symbol = Object.keys(prices)[i];
      dispatch({ type: 'SET_PRICE', id: symbol, price: prices[symbol] });
    }
  }, [check]); // runs useEffect every time this checkPrices() causes a state change

  return (
    <PricesContext.Provider value={{ state, dispatch, checkPrices }}>
      {props.children}
    </PricesContext.Provider>
  );
}

export const usePrices = () => useContext(PricesContext);