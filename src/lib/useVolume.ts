import { SwapItemFragment } from 'gql/graphql'
import { allSwapsQueryDocument } from 'queries/swap'
import { useGraphQL } from 'useGraphQL'

// todo: lot of work to do for good volume numbers, this is just the start placeholder.
export const useVolume = (): { volume: number } => {
    const poolId = 0
    const swaps = useGraphQL(allSwapsQueryDocument, { poolId })

    const volume = (swaps?.data?.swaps?.items as SwapItemFragment[]).reduce(
        (acc, swap) => {
            return acc + swap.amountIn
        },
        0
    )

    return { volume }
}
