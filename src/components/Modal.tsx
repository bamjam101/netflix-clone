import { Fragment, LegacyRef, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Position } from "../common/types";

type ModalProp = {
  isOpen: boolean;
  onClose: (value: boolean) => void;
  title?: string | React.ReactElement;
  children: React.ReactElement;
  closeModal?: () => void;
  position?: Position | null;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  closeModal,
  position,
}: ModalProp) {
  const modalRef = useRef<HTMLDivElement>(null);

  function handleMouseLeave(e: MouseEvent) {
    if (closeModal) {
      closeModal();
    }
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterEnter={() => {
            modalRef.current?.addEventListener("mouseleave", handleMouseLeave);
          }}
          afterLeave={() => {
            modalRef.current?.removeEventListener(
              "mouseleave",
              handleMouseLeave
            );
          }}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                ref={modalRef}
                className="w-auto transform overflow-hidden rounded-2xl bg-black text-left align-middle shadow-xl transition-all"
                style={
                  position ? { position: "fixed", ...position } : undefined
                }
              >
                <article className="flex h-full w-full flex-col items-center justify-center">
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
