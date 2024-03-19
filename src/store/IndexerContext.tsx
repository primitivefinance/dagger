import { createContext } from 'react';
import { useReducer, useContext, useEffect, useState } from 'react';
import { getPools, getUserPositions } from '../lib/indexer';
import { useAccount } from 'wagmi';

type Action = {
  type: 'SET_POOLS' | 'SET_USER_POSITIONS';
  payload: Pool[] | Position[];
}

type IndexerContextState = {
  pools: Pool[];
  userPositions: Position[];
  dispatch: (action: Action) => void;
  updateIndexer: () => void;
}

export const IndexerContext = createContext<IndexerContextState>({} as IndexerContextState);

const initialIndexerState: IndexerContextState = {
  pools: [],
  userPositions: [],
  dispatch: () => { },
  updateIndexer: () => null,
};

function indexerReducer(state: IndexerContextState, action: Action): IndexerContextState {
  switch (action.type) {
    case 'SET_POOLS':
      return {
        ...state,
        pools: action.payload as Pool[],
      };
    case 'SET_USER_POSITIONS':
      return {
        ...state,
        userPositions: action.payload as Position[],
      };
    default:
      throw new Error('Invalid action');
  }
}

type IndexerProviderProps = {
  children: React.ReactNode;
}

export function IndexerProvider(props: IndexerProviderProps) {
  const { address } = useAccount();

  const [state, dispatch] = useReducer(indexerReducer, initialIndexerState);

  const [update, setUpdate] = useState(false)

  const updateIndexer = () => {
    setUpdate(!update)
  }

  useEffect(() => {
    (async() => {
      const pools = await getPools() as unknown as Pool[]
      if (!pools) return
      dispatch({
        type: 'SET_POOLS',
        payload: pools
      })
    })
    console.log(state.pools)
  }, [update]);

  useEffect(() => {
    (async () => {
      if (address) {
        const pools = await getUserPositions(address) as unknown as Pool[]
        if (!pools) return
        dispatch({
          type: 'SET_USER_POSITIONS',
          payload: pools,
        });
      }
    })();
  }, [address, update]);

  return (
    <IndexerContext.Provider value={{ ...state, dispatch, updateIndexer }}>
      {props.children}
    </IndexerContext.Provider>
  );
}

export const useIndexer = () => useContext(IndexerContext);