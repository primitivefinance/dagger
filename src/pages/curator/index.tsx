import { Button } from '@/components/ui/button'
import { useNavigate, useParams } from 'react-router-dom'

function Curator(): JSX.Element {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-2xl items-center justify-center min-h-screen mt-[-64px]">
            <div className="flex flex-col gap-md items-center justify-center">
                Curator page coming soon.
                <Button variant="default" onClick={() => navigate(-1)}>
                    Go back
                </Button>
            </div>
        </div>
    )
}

export default Curator
