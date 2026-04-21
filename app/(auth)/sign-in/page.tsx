"use client"
import AuthButton from "@/app/components/utils/authButton";
import Input from "@/app/components/utils/input";
import Image from "next/image"
import Link from "next/link"
import logo from "@/app/assets/images/Loader.png"
import useFetch from "@/app/lib/useAsyncFetch";
import { useState } from "react";
import axiosInstance from "@/app/lib/axios";
import { useAuthStore } from "@/app/store/auth.store";
import { useRouter } from "next/navigation";
import { NetworkErrorModal } from "@/app/components/headlessUiComponents/networkErrorModal";

export default function Page() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const [erorData, setErrorData] = useState<{ errorTitle: string, errorMessage: string }>({
        errorTitle: "",
        errorMessage: ""
    });
    
    const { saveCookie } = useAuthStore.getState();
    const router = useRouter();

    const isStage1Valid = phoneNumber.trim() !== '' && password.length >= 8;

    const loginUser = async () => {
        setIsLoading(true);

        try {
            // FIX: Don't just set state, create a variable to use immediately
            let formattedPhone = phoneNumber.trim();
            
            if (formattedPhone.startsWith('0')) {
                formattedPhone = '+234' + formattedPhone.slice(1);
            } else if (formattedPhone.startsWith('+2340')) {
                formattedPhone = '+234' + formattedPhone.slice(5);
            }
            
            // Sync the UI state too
            setPhoneNumber(formattedPhone);

            const response = await axiosInstance.post(`/v1/auth/login`, {
                phoneNumber: formattedPhone, // Use the variable, not the state
                password,
            });

            const data = response.data;

            if (data.refreshTokenJWT && data.accessTokenJWT) {
                saveCookie("ACTFL", data.accessTokenJWT);
                saveCookie("RFTFL", data.refreshTokenJWT);
                
                // Refresh to update server components, then push to home/dashboard
                router.refresh();
                router.push("/"); 
            }
        } catch (error: any) {
            setErrorData({
                errorTitle: "Sign In Failed",
                errorMessage: error.response?.data?.message || "An unexpected error occurred. Please check your credentials and try again."
            });
            setError(true);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginUser();
    };

    return (        
        <div className="w-full min-h-screen py-25 px-4 flex justify-center items-center">
            <div className="w-full max-w-100 bg-(--card) rounded-[30px] h-auto border border-gray-100 p-1.5">
                <div className="w-full h-auto flex flex-col items-center bg-[#fcfcfc] border border-gray-100 rounded-3xl py-5">
                    <div className="size-15 rounded-full border border-gray-100 z-10 bg-white -top-7.5">
                        <Link href={'/'} className="flex justify-center items-center size-full">
                            <Image
                                className="w-[45%] h-auto"
                                alt="logo"
                                src={logo}
                            />
                        </Link>
                    </div>
                    <div className="w-full flex justify-center pt-5 flex-col items-center px-5 gap-3">
                        <h3 className='custom3 text-(--primary) text-2xl tracking-body leading-5'>Welcome back</h3>
                        <p className="leading-body text-center title-font track-body font-medium text-(--secondary)">Enter your credentials to log in.</p>
                        <form className="w-full flex-col flex gap-4" onSubmit={handleSubmit}>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-sm title-font tracking-body text-black font-medium ">Phone Number</label>
                                <input
                                    type={"tel"}
                                    placeholder="08123456789"
                                    className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-sm title-font tracking-body text-black font-medium ">Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button 
                                type="submit"
                                disabled={isLoading || !isStage1Valid} 
                                className="w-full flex gap-2 justify-center items-center px-5 h-10 title-font hover:bg-(--green) disabled:opacity-70 bg-green-600 transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm text-white "
                            >
                                {!isLoading ? "Sign In" : (
                                    <div className="flex items-center justify-center space-x-1">
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0s" }} />
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.2s" }} />
                                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: "0.4s" }} />
                                    </div>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                <div className="py-3 flex justify-center">
                    <p className="leading-body text-sm title-font track-body font-medium text-(--secondary)">Don't have an account? <Link href={"/sign-up"} className="link-style">Sign up</Link>.</p>
                </div>
            </div>
            <NetworkErrorModal
                errorTitle={erorData.errorTitle}
                errorMessage={erorData.errorMessage}
                isOpen={error}
                onClose={() => setError(false)}
                onRetry={loginUser}
            />
        </div>
    );
}