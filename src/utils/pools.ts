import { PoolWithTokensFragment } from 'gql/graphql'

export enum PoolTypes {
    ConstantSum = 'ConstantSum',
    LogNormal = 'LogNormal',
    nTokenGeometricMean = 'nTokenGeometricMean',
}

export function getPoolType(pool: PoolWithTokensFragment): PoolTypes {
    return pool.strategy.name as PoolTypes
}

export const FALLBACK_LOGO = 'https://github.com/shadcn.png'
