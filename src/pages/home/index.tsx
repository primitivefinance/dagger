import { title, subtitle } from '@/data/copy/home'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Separator } from '@radix-ui/react-separator'
import { useGraphQL } from '../../useGraphQL'
import PoolsTable from '@/components/PoolsTable'
import { allPoolsQueryDocument } from '../../queries/all-pools'

function Home() {
    //const { pools } = useIndexer();

    const { data } = useGraphQL(allPoolsQueryDocument, { limit: 10 })

    return (
        <>
            <div className="w-full pt-16 pb-6">
                <div className="container mx-auto max-w-4xl">
                    <div className="gap-2 flex flex-col">
                        <h1 className="font-bold scroll-m-20 text-3xl">
                            {title}
                        </h1>
                        <h3 className="scroll-m-20 text-xl font-semibold">
                            {subtitle}
                        </h3>
                    </div>
                    <Separator className="my-4" />
                </div>
            </div>
            <div className="container mx-auto max-w-4xl gap-2 flex flex-col">
                <div className="flex flex-row items-center w-full justify-between">
                    <h3 className="scroll-m-20 text-xl font-semibold tracking-tight">
                        All Pools ({data?.pools?.items?.length ?? 0})
                    </h3>
                    <Button variant="secondary" asChild>
                        <Link className="p-2" to="/create-pool">
                            <div className="flex flex-row items-center gap-1">
                                <svg
                                    className="w-4 h-3 text-dagger4"
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
                        </Link>
                    </Button>
                </div>
                <div className="bg-dagger1 rounded-lg border border-dagger2 border-solid">
                    <PoolsTable />
                </div>
            </div>
        </>
    )
}

export default Home
