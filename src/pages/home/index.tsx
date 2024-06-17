import React from 'react'

import { useGraphQL } from '../../useGraphQL'
import { allMarketsQueryDocument } from '../../queries/markets'

import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip'
import PoolsTable from '@/components/PoolsTable'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion'
import SectionHeader from '@/components/SectionHeader'

export const MARKET_TITLE = 'Market'
export const AVATAR_SIZE = 'size-[3rem] md:size-[6rem]' as const

const CreatePoolButton: React.FC = () => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button variant="tx" disabled>
                    <div className="flex flex-row items-center gap-1">
                        <svg
                            className="w-4 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M5 12h14m-7 7V5"
                            />
                        </svg>
                        Create pool
                    </div>
                </Button>
            </TooltipTrigger>
            <TooltipContent>Coming soon</TooltipContent>
        </Tooltip>
    )
}

const EmptyMarket: React.FC = () => {
    return (
        <div className="border flex flex-col gap-0 p-xl items-center justify-center h-96">
            <h2 className="text-muted/35 dark:text-muted-foreground/35">
                Select a market
            </h2>
        </div>
    )
}

interface HomeProps {
    children?: React.ReactNode
}

const Home: React.FC<HomeProps> = ({ children }) => {
    const { data, refetch, isFetching, isLoading } = useGraphQL(
        allMarketsQueryDocument,
        { limit: 10 }
    )
    const amountMarkets = data?.markets?.items?.length

    const [value, setValue] = React.useState<string>('item-1')

    return (
        <div className="flex flex-col gap-2xl p-xl pt-0">
            <Accordion
                type="single"
                collapsible
                value={value}
                onValueChange={setValue}
            >
                <AccordionItem value="item-1" className="border-0">
                    <SectionHeader
                        title="Yield Markets"
                        quantity={amountMarkets}
                        isFetching={isFetching}
                        refetch={refetch}
                        isLoading={isLoading}
                    >
                        <div className="flex flex-row gap-md items-center justify-end">
                            <CreatePoolButton />
                            <AccordionTrigger />
                        </div>
                    </SectionHeader>

                    <AccordionContent>
                        <div className="flex flex-col gap-0 border border-t-0">
                            <div className="grid grid-cols-1 gap-md">
                                {data && (
                                    <PoolsTable
                                        data={data}
                                        isFetching={isFetching}
                                        amount={amountMarkets}
                                    />
                                )}
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {children ?? <EmptyMarket />}
        </div>
    )
}

export default Home
