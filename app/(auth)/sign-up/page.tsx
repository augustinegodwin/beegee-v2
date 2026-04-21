"use client";
import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../assets/images/Loader.png';
import axiosInstance from '@/app/lib/axios';
import avater from '../../../public/avatar.jpg'
import { useRouter } from 'next/navigation';
import { NetworkErrorModal } from '@/app/components/headlessUiComponents/networkErrorModal';
import { SuccessModal } from '@/app/components/headlessUiComponents/successModal';
export default function SignUpForm() {
    const [showMore, setShowMore] = useState(1);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState(false);  
    const [error, setError] = useState<boolean>(false);
    const [errorData,setErrorData] = useState<{errorTitle:string,errorMessage:string}>({
          errorTitle:"",
          errorMessage:""
        });
    const [success, setSuccess] = useState(false);
    const [successData, setSuccessData] = useState<{successTitle:string,successMessage:string}>({
        successTitle:"",
        successMessage:""
    });
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        password: '',
        level: '100',
        appartment: '',
        address: '',
        profileImage: null as File | null, 
        imagePreview: null as string | null
    });

    // VALIDATION logic for your buttons
    const isStage1Valid = 
        formData.name.trim() !== '' && 
        formData.phoneNumber.trim() !== '' && 
        formData.password.length >= 8;

    const isStage2Valid = 
        formData.appartment.trim() !== '' && 
        formData.address.trim() !== '';

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                profileImage: file,
                imagePreview: URL.createObjectURL(file) 
            }));
        }
    };

    const handleNext = (e: FormEvent) => {
        e.preventDefault();
        if (isStage1Valid) setShowMore(2);
    };

    const submitForm = async () => {
        if (!isStage2Valid) return;

        // --- PHONE NUMBER FORMATTING ---
        let finalPhone = formData.phoneNumber.trim();
        if (finalPhone.startsWith('+2340')) {
            finalPhone = '+234' + finalPhone.slice(5);
        } else if (finalPhone.startsWith('0')) {
            finalPhone = '+234' + finalPhone.slice(1);
        }

        // --- CONSTRUCTING FORMDATA ---
        const data = new FormData();
        data.append('name', formData.name);
        data.append('phoneNumber', finalPhone);
        data.append('password', formData.password);
        data.append('level', formData.level);
        data.append('appartment', formData.appartment);
        data.append('address', formData.address);
        if (formData.profileImage) {
            data.append('profileImage', formData.profileImage);
        }else {
        try {
            // Fetch your local default avatar and convert to a file
            // Make sure your default avatar is in the /public folder
            const response = await fetch('/avatar.jpg'); 
            const blob = await response.blob();
            const defaultFile = new File([blob], 'default-avatar.png', { type: 'image/png' });
            
            data.append('profileImage', defaultFile);
        } catch (error) {
           
        }
    }

       
  try {
    setLoading(true);
    const request = await axiosInstance.post("/v1/auth/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    const response = await request;
    setSuccess(true);
    setSuccessData({
        successTitle:"Registration Successful",
        successMessage:"Your account has been created successfully. You can now sign in."
    });
  } catch (error) {
    setErrorData({
  errorTitle: "Registration Failed",
  errorMessage: "An unexpected error occurred. Please check your credentials and try again."
});
    setError(true);
  }finally {
    setLoading(false);
  }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await submitForm();
    };

    return (
        <div className="w-full min-h-screen py-25 px-4 flex justify-center items-center">
            <div className="w-full max-w-100 bg-(--card) rounded-[30px] h-auto border border-gray-100 p-1.5 flex-col items-center flex justify-center relative">
                
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
                        <h3 className='custom3 text-(--primary) text-2xl tracking-body leading-5'>
                            {showMore === 1 ? "Create your account" : "Complete Profile"}
                        </h3>
                        <p className="leading-body text-center title-font track-body font-medium text-(--secondary)">
                            {showMore === 1 ? "Lets get started it is free." : "Almost there! Setup your delivery details."}
                        </p>

                        {showMore === 1 && (
                            <form className="w-full flex-col flex gap-4" onSubmit={handleNext}>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="text-sm title-font tracking-body text-black font-medium">Full Name</label>
                                    <input
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="text-sm title-font tracking-body text-black font-medium">Phone Number</label>
                                    <input
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="09032457431"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="text-sm title-font tracking-body text-black font-medium">Password (min 8 characters)</label>
                                    <input
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    disabled={!isStage1Valid}
                                    className="w-full px-5 py-3 title-font bg-green-600 transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Continue
                                </button>
                            </form>
                        )}

                        {showMore === 2 && (
                            <form className="w-full flex-col flex gap-4" onSubmit={handleSubmit}>
                                <div className="w-full flex-row flex gap-4 items-center">
                                    <div className="w-fit flex flex-col gap-1 justify-start">
                                        <input className='hidden' type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" />
                                        <div 
                                            onClick={() => fileInputRef.current?.click()} 
                                            className="size-20 rounded-full border-2 border-gray-100 overflow-hidden cursor-pointer hover:border-green-600 transition-all"
                                        >
                                            <Image
                                                className="size-full object-cover"
                                                alt="preview"
                                                src={formData.imagePreview || avater} 
                                                width={80} height={80}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-1 flex flex-col gap-1">
                                        <label className="text-sm title-font tracking-body text-black font-medium">University Level</label>
                                        <select
                                            className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3 appearance-none'
                                            name="level"
                                            value={formData.level}
                                            onChange={handleChange}
                                        >
                                            {[100, 200, 300, 400, 500, 600].map(lvl => (
                                                <option key={lvl} value={lvl}>{lvl}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="text-sm title-font tracking-body text-black font-medium">Appartment</label>
                                    <input
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                        type="text"
                                        name="appartment"
                                        value={formData.appartment}
                                        onChange={handleChange}
                                        placeholder="Room number"
                                    />
                                </div>
                                <div className="w-full flex flex-col gap-1">
                                    <label className="text-sm title-font tracking-body text-black font-medium">Delivery Address</label>
                                    <input
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Hostel Location"
                                    />
                                </div>
                                <div className="flex flex-row gap-2">
                                     <button 
                                        type="button" 
                                        onClick={() => setShowMore(1)}
                                        className="flex-1 text-sm tracking-body title-font2 text-(--secondary) hover:text-black transition-colors"
                                    >
                                        ← Edit basic info
                                    </button>
                                    <button 
                                        type='submit' 
                                        disabled={!isStage2Valid || loading}
                                        className="flex-1 px-5 h-10 title-font bg-green-600 transition-all rounded-xl font-medium leading-[1.1] tracking-body text-sm text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? "" : "Sign Up"}
      {loading &&<div className="flex items-center justify-center space-x-1">
  <div
    className="w-2 h-2 bg-white rounded-full animate-pulse"
    style={{ animationDelay: "0s" }}
  />
  <div
    className="w-2 h-2 bg-white rounded-full animate-pulse"
    style={{ animationDelay: "0.2s" }}
  />
  <div
    className="w-2 h-2 bg-white rounded-full animate-pulse"
    style={{ animationDelay: "0.4s" }}
  />
</div>}
                                    </button>
                                   
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                
                <div className="py-3 px-5 flex justify-center">
                    {
                        showMore === 1 &&<p className="leading-body text-sm title-font track-body font-medium text-(--secondary)">Already have an account? <Link href={"/sign-in"} className="link-style">Sign in</Link>.</p>
                    }
                    {
                        showMore === 2 && 
                        <p className="leading-body text-sm text-center title-font track-body font-medium text-(--secondary)">
                        By continuing, you agree to our 
                        <Link href={"/sign-in"} className="link-style"> Terms </Link> and 
                        <Link href={"/sign-in"} className="link-style"> Privacy Policy</Link>.
                    </p>}
                </div>
            </div>
            <NetworkErrorModal
              errorTitle={errorData.errorTitle}
              errorMessage={errorData.errorMessage}
                isOpen={error}
                onClose={() => setError(false)}
                onRetry={submitForm}
            />
            <SuccessModal
                title={successData.successTitle}
                message={successData.successMessage}
                isOpen={success}
                onClose={() => setSuccess(false)}
                onContinue={()=>router.push("/sign-in")}
            />

        </div>
    );
}