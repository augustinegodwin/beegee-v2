"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircle2, ArrowRight, Check } from "lucide-react";

interface SuccessModalProps {
  title?: string;
  message?: string;
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
  buttonData?:string
}

export function SuccessModal({ isOpen, onClose, onContinue, title, message,buttonData }: SuccessModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={onClose}>
        
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-sm transform overflow-hidden rounded-3xl bg-white p-5 sm:p-8 text-center shadow-xl transition-all">
              
              {/* Icon Section - Success Green */}
              <div className="mb-6 flex justify-center">
                <div className={'bg-green-500 w-fit rounded-full p-4'}>
                     
                        <Check className="w-8 h-8 text-white" />
                     
                    </div>
              </div>
              
              {/* Title */}
              <h1 className="text-xl tracking-body custom3 text-black mb-2">
                {title || "Success!"}
              </h1>
              
              {/* Message */}
              <p className="text-(--secondary) tracking-body title-font2 mb-6">
                {message || "Your action was completed successfully."}
              </p>
              
              {/* Buttons */}
              <div className="flex items-center gap-5 justify-center">
                <button 
                  onClick={() => {
                    if (onContinue) onContinue();
                    onClose();
                  }}
                  className="flex items-center space-x-2 px-6 py-2.5 bg-green-600 hover:bg-green-700 rounded-xl transition-colors w-full justify-center"
                >
                  <span className="text-white tracking-body title-font2 font-medium">
                    {buttonData ||"Continue"}
                  </span>
                  <ArrowRight size={18} className="text-white" />
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}