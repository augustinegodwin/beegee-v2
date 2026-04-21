"use client"
import React, { useState, useEffect, Fragment } from 'react';
import { Dialog, Transition, Combobox } from '@headlessui/react';
import { ChevronDown, Loader2, CheckCircle2, AlertCircle, Check } from 'lucide-react';
import axios from 'axios';
import { useAuthStore } from '@/app/store/auth.store';
import { requestPayout } from '@/app/lib/async_data';
import { SuccessModal } from '../headlessUiComponents/successModal';
import { NetworkErrorModal } from '../headlessUiComponents/networkErrorModal';
// Assuming these are imported from your components folder
// import { SuccessModal, NetworkErrorModal } from '@/app/components/Modals'; 

const PAYSTACK_SECRET_KEY =process.env.PAYSTACK_SECRET_KEY; 

export const AddBankModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
    const [banks, setBanks] = useState<{ name: string, code: string }[]>([]);
    const [query, setQuery] = useState('');
    const [selectedBank, setSelectedBank] = useState<{ name: string, code: string } | null>(null);
    const { getCookie, user } = useAuthStore();
    
    const [accountNumber, setAccountNumber] = useState("");
    const [accountName, setAccountName] = useState("");
    
    const [isResolving, setIsResolving] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resError, setResError] = useState(""); // Resolution error
    
    const [showSuccess, setShowSuccess] = useState(false);
    const [showNetError, setShowNetError] = useState(false);

    const handleUpdateStatus = async () => {
        const rfToken = getCookie("RFTFL");
        const acToken = getCookie("ACTFL");
        const signedCookies = JSON.stringify({ "accessToken": acToken, "refreshToken": rfToken });

        if (user?.user && selectedBank?.name && accountName) {
            setIsSubmitting(true);
            const data = {
                amount: user.user.walletBalance,
                accountInformation: {
                    name: accountName,
                    number: accountNumber,
                    bank: selectedBank.name,
                },
                signedCookies
            };

            try {
                const response = await requestPayout(data);
                const res=await response
                if (res) {
                    setShowSuccess(true);
                    onClose();
                } else {
                    setShowNetError(true);
                }
            } catch (err) {
                setShowNetError(true);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const filteredBanks = query === ''
        ? banks
        : banks.filter((bank) =>
            bank.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))
        );

    useEffect(() => {
        const fetchBanks = async () => {
            try {
                const res = await axios.get('https://api.paystack.co/bank?country=nigeria', {
                    headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` }
                });
                setBanks(res.data.data);
            } catch (err) {
                console.error("Failed to load banks");
            }
        };
        if (isOpen) fetchBanks();
    }, [isOpen]);

    useEffect(() => {
        const resolveAccount = async () => {
            if (accountNumber.length === 10 && selectedBank) {
                setIsResolving(true);
                setResError("");
                setAccountName("");
                try {
                    const res = await axios.get(
                        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank.code}`,
                        { headers: { Authorization: `Bearer ${PAYSTACK_SECRET_KEY}` } }
                    );
                    setAccountName(res.data.data.account_name);
                } catch (err: any) {
                    setResError(err.response?.data?.message || "Invalid withdrawal details");
                } finally {
                    setIsResolving(false);
                }
            }
        };
        resolveAccount();
    }, [accountNumber, selectedBank]);
    const handleContinue = () => {
        setShowSuccess(false);
        window.location.reload(); // Refresh to update balance and transactions
    }
    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={onClose}>
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className="w-full max-w-md transform rounded-3xl bg-white p-8 shadow-2xl transition-all">
                                    
                                    <Dialog.Title className="text-xl tracking-body text-black title-font mb-6">
                                        Withdrawal Method
                                    </Dialog.Title>

                                    <div className="flex flex-col gap-5">
                                        <div className="relative">
                                            <label className="text-sm title-font2 text-gray-400 mb-1 block ml-1">Receiving Bank</label>
                                            <Combobox value={selectedBank} onChange={(val) => {
                                                setSelectedBank(val);
                                                setAccountName(""); 
                                                setResError("");
                                            }}>
                                                <div className="relative mt-1">
                                                    <div className="relative w-full cursor-default overflow-hidden rounded-2xl bg-gray-50 border-2 border-gray-100 focus-within:border-black transition-all">
                                                        <Combobox.Input
                                                            className="w-full border-none py-4 pl-4 pr-10 text-lg leading-5 text-black bg-transparent outline-none title-font2"
                                                            displayValue={(bank: any) => bank?.name || ''}
                                                            onChange={(event) => setQuery(event.target.value)}
                                                            placeholder="Select bank for payout..."
                                                        />
                                                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </Combobox.Button>
                                                    </div>
                                                    <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0" afterLeave={() => setQuery('')}>
                                                        <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {filteredBanks.map((bank, id) => (
                                                                <Combobox.Option
                                                                    key={id}
                                                                    className={({ active }) => `relative cursor-default select-none tracking-body title-font2 py-2 pl-10 pr-4 ${active ? 'bg-black text-white' : 'text-gray-900'}`}
                                                                    value={bank}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={`block truncate ${selected ? '' : 'font-normal'}`}>{bank.name}</span>
                                                                            {selected && (
                                                                                <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-black'}`}>
                                                                                    <Check className="h-4 w-4" aria-hidden="true" />
                                                                                </span>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </Combobox.Option>
                                                            ))}
                                                        </Combobox.Options>
                                                    </Transition>
                                                </div>
                                            </Combobox>
                                        </div>

                                        <div>
                                            <label className="text-sm tracking-body title-font2 font-medium text-gray-400 mb-1 block ml-1">Account Number</label>
                                            <input
                                                type="text"
                                                inputMode="numeric"
                                                maxLength={10}
                                                placeholder="Enter 10 digits"
                                                value={accountNumber}
                                                onChange={(e) => {
                                                    const val = e.target.value.replace(/\D/g, '');
                                                    setAccountNumber(val);
                                                    if (val.length !== 10) {
                                                        setAccountName("");
                                                        setResError("");
                                                    }
                                                }}
                                                className="w-full text-black tracking-body title-font2 rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-4 outline-none focus:border-black focus:bg-white transition-all text-lg font-medium tracking-widest"
                                            />
                                        </div>

                                        <div className="min-h-[60px] flex items-center justify-center rounded-2xl border border-dashed border-gray-200 px-4 text-center">
                                            {isResolving ? (
                                                <div className="flex items-center gap-2 tracking-body title-font2 text-sm text-gray-500">
                                                    <Loader2 size={18} className="animate-spin text-black" />
                                                    <span>Verifying account...</span>
                                                </div>
                                            ) : resError ? (
                                                <div className="flex items-center gap-2 tracking-body title-font2 text-sm text-red-500 font-medium">
                                                    <span>{resError}</span>
                                                </div>
                                            ) : accountName ? (
                                                <div className="flex items-center gap-3 title-font2 text-sm text-green-700">
                                                    <span className="uppercase tracking-tight font-bold">{accountName}</span>
                                                </div>
                                            ) : (
                                                <span className="text-xs text-gray-400 tracking-body title-font2 uppercase tracking-[0.1em]">Verify destination for funds</span>
                                            )}
                                        </div>

                                        <button
                                            disabled={!accountName || isResolving || !!resError || accountNumber.length !== 10 || isSubmitting}
                                            onClick={handleUpdateStatus}
                                            className="w-full flex items-center justify-center gap-2 tracking-body title-font2 mt-2 bg-black text-white rounded-2xl py-3 hover:bg-zinc-900 transition-all disabled:opacity-20 disabled:grayscale cursor-pointer text-sm font-bold"
                                        >
                                            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
                                            {isSubmitting ? "Processing..." : "Authorize Withdrawal"}
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Success and Error Modals with your updated text */}
            <SuccessModal
                isOpen={showSuccess}
                onClose={handleContinue}
                title="Withdrawal Requested"
                message="Your payout request has been received. Our team will verify the transaction, and funds will be sent to your bank account shortly."
                onContinue={handleContinue}
                buttonData="Done"
            />

            <NetworkErrorModal
                isOpen={showNetError}
                onClose={() => setShowNetError(false)}
                errorMessage="We encountered a problem processing your withdrawal. Please verify your connection or bank details and try again."
                errorTitle="Withdrawal Failed"
                onRetry={handleUpdateStatus}
            />
        </>
    );
};