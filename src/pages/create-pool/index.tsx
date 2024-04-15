import { useState } from 'react'
import CardToggleGroup from '@/components/CardRadioGroup'

import { title, subtitle, tags, strats } from '@/data/copy/create-pool'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'

import CreatePoolForm from '../../components/CreatePoolForm/index'

function CreatePool() {

    const [strategy, setStrategy] = useState(strats[0].value)
    return (
        <div className="py-16 container mx-auto max-w-6xl gap-14 flex flex-col">
            <div className="flex flex-col gap-2">
                <h2 className="text-3xl font-semibold">{title}</h2>
                <h4 className="leading-tight text-xl">{subtitle}</h4>
            </div>
            <div className="grid grid-cols-[1fr_2fr] gap-x-14 gap-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{tags['strategy'].title}</CardTitle>
                        <CardDescription>
                            {tags['strategy'].sub}
                        </CardDescription>
                    </CardHeader>
                </Card>
                <CardToggleGroup
                    options={strats}
                    value={strategy}
                    setValue={setStrategy}
                />
            </div>
            <CreatePoolForm strategy={strategy}>
                {
                    'Insert Transaction Handler Here:  May access form state via useContext(CreatePoolContext) exported from CreatePoolForm. '
                }
            </CreatePoolForm>
        </div>
    )
}

export default CreatePool
