import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";


type ModalProps = {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
}

function Modal(props: ModalProps) {
  return (
<<<<<<< Updated upstream
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{props.title}</DialogTitle>
      </DialogHeader>
      {props.children}
    </DialogContent >
=======
    <>
      {props.isOpen && (
        <div className="transition top-0 left-0 absolute z-10 w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col gap-4 bg-background border-dagger2 border border-solid p-4 rounded-lg max-w-md min-w-80">
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold text-base">{props.title}</p>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
>>>>>>> Stashed changes
  );
}

export default Modal;
