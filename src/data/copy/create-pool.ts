import { CardToggleOption } from '@/components/CardRadioGroup'

export const title: string = 'Create New DFMM Pool'

export const subtitle: string =
    'Determine parameters, define a DFMM strategy contract, and deposit assets.'

type Tags = { [key: string]: { title: string; sub: string } }

export const tags: Tags = {
    ['strategy']: {
        title: 'Strategy',
        sub: 'Select a DFMM Strategy',
    },
    ['controller']: {
        title: 'Pool Controller',
        sub: 'Identify an address that may edit pool parameters',
    },
    ['fee']: {
        title: 'Pool Fees',
        sub: 'Select the cost of rebalancing your pool.  Higher fees, less arbitrage.',
    },
    ['mean']: {
        title: 'Mean Price',
        sub: 'Determine the target price of a concentrated liquidity pool (CLP).',
    },
    ['width']: {
        title: 'Liquidity Range',
        sub: 'Select the width of a concentrated liquidity pool (CLP).',
    },
    ['price']: {
        title: 'Asset Price',
        sub: 'Select the price of a fixed order.'
    },
    ['portfolio']: {
        title: 'Portfolio Composition',
        sub: 'Determine the assets included in the new pool.',
    },
}

export const strats: CardToggleOption[] = [
    {
        value: 'GeometricMean',
        title: 'Weighted Portfolio',
        description: 'Geometric mean strategy with any number of tokens.',
    },
    {
        value: 'LogNormal',
        title: 'Concentrated Liquidity',
        description: 'Dynamically concentrated liquidity strategy.',
    },
    {
        value: 'ConstantSum',
        title: 'Fixed Order',
        description: 'Offer to buy or sell an asset at a single price.',
    },
]

export const feeLevels: CardToggleOption[] = [
    {
        value: '0.01',
        title: '0.01%',
        description:
            'Highly correlated asset pairs with negligible volatility.',
    },
    {
        value: '0.05',
        title: '0.05%',
        description:
            'Correlated asset pairs, such as stablecoins, with low volatility.',
    },
    {
        value: '0.3',
        title: '0.30%',
        description: 'Asset pairs with normal volaility.',
    },
]