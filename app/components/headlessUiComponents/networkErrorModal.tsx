"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { WifiOffIcon, RefreshCcw, AlertCircle } from "lucide-react";

interface NetworkErrorProps {
  errorTitle?: string;
  errorMessage?: string;
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
}

export function NetworkErrorModal({ isOpen, onClose, onRetry,errorTitle,errorMessage }: NetworkErrorProps) {
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
              
              {/* YOUR ORIGINAL UI START */}
              <div className="mb-6">
                {errorMessage ? <AlertCircle size={48} className="text-(--warning) mx-auto"  /> : <WifiOffIcon size={48} className="text-(--warning) mx-auto" />}
              </div>
              
              <h1 className="text-xl tracking-body custom3 text-black mb-2">
                {errorTitle || "Network Error"}
              </h1>
              
              <p className="text-(--secondary) tracking-body title-font2 mb-6">
                {errorMessage || "Unable to get products. Please check your connection."}
              </p>
              
              <div className="flex items-center gap-5 justify-center">
                <button 
                  onClick={() => {
                    onClose();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-black hover:opacity-50 rounded-xl transition-colors"
                >
                  <span className="text-white tracking-body title-font2">
                    Dismiss
                  </span>
                </button>
                <button 
                  onClick={() => {
                    if (onRetry) onRetry();
                    onClose();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <RefreshCcw size={16} className="text-(--secondary)" />
                  <span className="text-(--secondary) tracking-body title-font2">
                    Try Again
                  </span>
                </button>
              </div>
              {/* YOUR ORIGINAL UI END */}

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}