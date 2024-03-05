type ModalProps = {
  isOpen: boolean;
  toggle: (isOpen: boolean) => void;
  children: React.ReactNode;
  title: string;
}

function Modal(props: ModalProps) {
  return (
    <>
      {props.isOpen && (
        <div className="transition top-0 left-0 absolute bg-dagger0/[0.50] z-10 w-screen h-screen flex justify-center items-center">
          <div className="flex flex-col gap-4 bg-dagger1 border-dagger2 border border-solid p-4 rounded-lg max-w-md min-w-80">
            <div className="flex flex-row justify-between items-center">
              <p className="font-bold text-base">{props.title}</p>
              <svg
                onClick={() => props.toggle(false)}
                className="w-5 h-5 cursor-pointer"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18 18 6m0 12L6 6" />
              </svg>
            </div>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;