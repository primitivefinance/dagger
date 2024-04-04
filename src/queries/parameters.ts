import { graphql } from '../gql'

export const NGParamsFragment = graphql(`
    fragment NGParamsItem on NTokenGeometricMeanParams {
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
            ...NGParamsItem
        }
    }
`)
