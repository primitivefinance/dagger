import { createContext } from 'react';
import { useReducer, useContext, useEffect } from 'react';
import { getPools } from '../lib/indexer';

type Action = {
  type: 'SET_POOLS';
  payload: Pool[];
}

type IndexerContextState = {
  pools: Pool[];
  dispatch: (action: Action) => void;
}

export const IndexerContext = createContext<IndexerContextState>({} as IndexerContextState);

const initialIndexerState: IndexerContextState = {
  pools: [],
  dispatch: () => { },
};

function indexerReducer(state: IndexerContextState, action: Action): IndexerContextState {
  switch (action.type) {
    case 'SET_POOLS':
      return {
        ...state,
        pools: action.payload,
      };
    default:
      throw new Error('Invalid action');
  }
}

type IndexerProviderProps = {
  children: React.ReactNode;
}

export function IndexerProvider(props: IndexerProviderProps) {
  const [state, dispatch] = useReducer(indexerReducer, initialIndexerState);

  useEffect(() => {
    (async () => {
      if (state.pools.length > 0) return;
      dispatch({
        type: 'SET_POOLS',
        payload: await getPools(),
      });
    })();
  }, [state.pools]);

  return (
    <IndexerContext.Provider value={{ ...state, dispatch }}>
      {props.children}
    </IndexerContext.Provider>
  );
}

export const useIndexer = () => useContext(IndexerContext);
