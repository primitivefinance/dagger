import { PoolWithTokensFragment } from 'gql/graphql'

export enum PoolTypes {
    ConstantSum = 'ConstantSum',
    LogNormal = 'LogNormal',
    nTokenGeometricMean = 'nTokenGeometricMean',
}

export function getPoolType(pool: PoolWithTokensFragment): PoolTypes {
    return pool.strategy.name as PoolTypes
}
