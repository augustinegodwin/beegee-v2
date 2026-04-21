"use client";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "success";
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "danger",
}: ConfirmationModalProps) {
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
              
              {/* Icon Section */}
              <div className="mb-6">
                {variant === "danger" ? (
                  <AlertCircle size={48} className="text-red-500 mx-auto" />
                ) : (
                  <CheckCircle2 size={48} className="text-green-600 mx-auto" />
                )}
              </div>
              
              <h1 className="text-xl tracking-body title-font2 text-black mb-2">
                {title}
              </h1>
              
              <p className="text-(--secondary) tracking-body title-font2 mb-6">
                {description}
              </p>
              
              <div className="flex items-center gap-5 justify-center">
                {/* Cancel / Secondary Button */}
                <button 
                  onClick={onClose}
                  className="flex items-center space-x-2 px-6 py-2 bg-gray-200 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <span className="text-(--secondary) tracking-body title-font2">
                    {cancelText}
                  </span>
                </button>

                {/* Confirm / Primary Button */}
                <button 
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`flex items-center space-x-2 px-6 py-2 rounded-xl transition-colors ${
                    variant === "danger" ? "bg-red-600 hover:bg-red-700" : "bg-black hover:opacity-80"
                  }`}
                >
                  <span className="text-white tracking-body title-font2">
                    {confirmText}
                  </span>
                </button>
              </div>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}