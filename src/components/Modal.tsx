import { Fragment, LegacyRef, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";

type ModalProp = {
  isOpen: boolean;
  handleClose: (value: boolean) => void;
  title: string | React.ReactElement;
  children: React.ReactElement;
};

export default function Modal({
  isOpen,
  handleClose,
  title,
  children,
}: ModalProp) {
  const modalRef = useRef<HTMLSelectElement>(null);
  function handleMouseLeave(e: MouseEvent) {
    handleClose(false);
  }
  useEffect(() => {
    if (modalRef.current) {
      modalRef.current?.addEventListener("mouseleave", handleMouseLeave);
    }
  }, [modalRef.current]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                <article
                  className="flex h-[100%] w-[100%] flex-col"
                  ref={modalRef}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-white"
                  >
                    {title}
                  </Dialog.Title>
                  {children}
                </article>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
