import { graphql } from '../gql'

export const NGParamsFragment = graphql(`
    fragment NgParamsItem on NTokenGeometricMeanParams {
        id
        poolId
        swapFee
        controller
        lastComputedWeights
        weightsUpdatePerSecond
        weightsUpdateEnd
        lastWeightsUpdate
    }
`)

export const nGParamsQueryDocument = graphql(/* GraphQL */ `
    query nGParams($id: BigInt!) {
        nTokenGeometricMeanParams(id: $id) {
            ...NgParamsItem
        }
    }
`)

export const csParamsFragment = graphql(`
    fragment CSParamsItem on ConstantSumParams {
        id
        poolId
        swapFee
        controller
        lastComputedPrice
        priceUpdatePerSecond
        priceUpdateEnd
        lastPriceUpdate
    }
`)

export const csParamsQueryDocument = graphql(/* GraphQL */ `
    query csParams($id: BigInt!) {
        constantSumParams(id: $id) {
            ...CSParamsItem
        }
    }
`)
