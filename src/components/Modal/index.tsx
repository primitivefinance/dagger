import { DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

type ModalProps = {
    isOpen: boolean
    toggle: (isOpen: boolean) => void
    children: React.ReactNode
    title: string
}

function Modal(props: ModalProps) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{props.title}</DialogTitle>
            </DialogHeader>
            {props.children}
        </DialogContent>
    )
}

export default Modal
