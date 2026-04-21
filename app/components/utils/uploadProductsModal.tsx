"use client";
import { Fragment, useState } from "react";
import { Dialog, Transition, Switch } from "@headlessui/react";
import Image from "next/image";
import bot from "@/app/assets/images/bottle.jpg";
import { PencilIcon, X } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { createProducts } from "@/app/lib/async_data";
import { SuccessModal } from "../headlessUiComponents/successModal";
import { useProductStore } from "@/app/store/products.store";
import { NetworkErrorModal } from "../headlessUiComponents/networkErrorModal";

interface UploadProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UploadProductModal({ isOpen, onClose }: UploadProductModalProps) {
  const {user,getCookie}=useAuthStore()
  const {setSelectedProduct}=useProductStore()

  const [productVerificationStep, setProductVerificationStep] = useState(1);
  const [enabled, setEnabled] = useState(false); // false = Rent, true = Sale
  const [loading,setLoading]=useState(false)
  const [success,setSuccess]=useState(false)
  const [error,setError]=useState(false)
  const [createdProduct,setCreatedProduct]=useState<Product | null>(null)
  const [imagePreview, setImagePreview] = useState<any>("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "all",
    price: "",
    replacementPrice: "",
  });

  // --- VALIDATION: Checks if required fields are filled ---
  const isFormValid = 
    formData.title.trim() !== "" && 
    formData.description.trim() !== "" && 
    formData.category.trim() !== "" &&
    formData.price.trim() !== "" &&
    (!enabled ? formData.replacementPrice.trim() !== "" : true);

  // --- HANDLERS ---
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const viewProduct=()=>{
    createdProduct && setSelectedProduct(createdProduct)
    
  }
  const handleSubmit = async () => {
     const rfToken=getCookie("RFTFL")
    const acToken=getCookie("ACTFL")
    const signedCookies1={
      "accessToken":acToken,
      "refreshToken":rfToken
    }
  const signedCookies=JSON.stringify(signedCookies1)
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("forSale", enabled.toString());
    data.append("signedCookies", signedCookies)
    data.append("price", formData.price);
    if (!enabled) data.append("replacementPrice", formData.replacementPrice);
    if (thumbnailFile) data.append("image", thumbnailFile);
    
    try {
      setLoading(true)
     const response=await createProducts(data)
     const main :(null | {loggedIn:boolean,newProduct:Product}) =response?.data
     console.log(response)
     if (response){
      onClose()
      setFormData({
        title: "",
        description: "",
        category: "all",
        price: "",
        replacementPrice: "",
      })
      setThumbnailFile(null)
      setImagePreview(null)
        setProductVerificationStep(1)
          setSuccess(true)
      setCreatedProduct(main?.newProduct || null)
     }else{
        setError(true)
     }
  } catch (error) {
    setError(true)
  }finally{
    setLoading(false)
  }
  };

  return (
    <>
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center ">
            <div className="w-full h-[40px] hidden lg:flex justify-center absolute top-0 left-0">
              <div className="w-full flex justify-end items-center cursor-pointer" onClick={onClose} >
                <div className="size-10 flex items-center justify-center"><X className="size-6 cursor-pointer text-white" /></div>
              </div>
            </div>
            
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="relative w-full px-4 sm:px-10 bg-white flex justify-center h-[calc(100vh-40px)] overflow-y-scroll">
                <div className="relative max-w-[550px] lg:max-w-[1200px] w-full h-full bg-white ">
                  <div className="w-full py-10">
                    <div className="w-full flex justify-start flex-col ">
                      <div className="w-full items-start justify-start flex flex-row lg:flex-col gap-5">
                        <div className="flex w-full flex-col lg:flex-row gap-10 ">
                          
                          {/* Sidebar Indicators */}
                          <div className="w-full lg:w-50 flex flex-col gap-5">
                            <div className="w-full flex flex-row items-center gap-4">
                                <svg width={24} viewBox="0 0 24 24" fill="none"><path d="M4 12L20 12" stroke={productVerificationStep === 1 ? "green" : "#E5E7EB"} strokeWidth={2} strokeLinecap="round" /></svg>
                                <p className={`text-base text-left leading-5 title-font ${productVerificationStep === 1 ? "text-black" : "text-(--secondary)"}`}>Product Information</p>
                            </div>
                            <div className="w-full flex flex-row items-center gap-4">
                                <svg width={24} viewBox="0 0 24 24" fill="none"><path d="M4 12L20 12" stroke={productVerificationStep === 2 ? "green" : "#E5E7EB"} strokeWidth={2} strokeLinecap="round" /></svg>
                                <p className={`text-base text-left leading-5 title-font ${productVerificationStep === 2 ? "text-black" : "text-(--secondary)"}`}>Review Product </p>
                            </div>
                          </div>
                          
                          <div className="flex-1 flex flex-col gap-10">
                            <div className="w-full px-1 items-center flex flex-col gap-5 sm:gap-10">
                              
                              {productVerificationStep === 1 && (
                                <>
                                  {/* THUMBNAIL */}
                                  <section className="w-full grid gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="space-y-1">
                                      <h2 className="text-lg tracking-body text-(--primary) custom3">Product Thumbnail</h2>
                                      <p className="text-sm tracking-body text-(--secondary) font-medium title-font">This will be displayed on your product listing.</p>
                                    </div>
                                    <div className="flex items-end gap-5">
                                      <div className="size-20 bg-gray-100 rounded-2xl overflow-hidden border border-gray-100">
                                        {imagePreview && <Image className="size-full object-cover" alt="logo" width={100} height={100} src={imagePreview} />}
                                      </div>
                                      <label className="cursor-pointer size-fit px-5 py-3 title-font bg-gray-200 transition-all rounded-xl font-medium text-sm text-black">
                                        {imagePreview ? "change" :"Upload"}
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                                      </label>
                                    </div>
                                  </section>

                                  {/* TITLE */}
                                  <section className="w-full grid gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="space-y-1">
                                      <h2 className="text-lg tracking-body text-(--primary) custom3">Product Title</h2>
                                      <p className="text-sm tracking-body text-(--secondary) font-medium title-font">This will be displayed on your product listing.</p>
                                    </div>
                                    <div>
                                      <input 
                                        name="title" 
                                        type="text" 
                                        placeholder="black Leather shoes (size 24)." 
                                        value={formData.title} 
                                        onChange={handleInputChange} 
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3' 
                                      />
                                    </div>
                                  </section>

                                  {/* DESCRIPTION */}
                                  <section className="w-full grid gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="space-y-1">
                                      <h2 className="text-lg tracking-body text-(--primary) custom3">Product Description</h2>
                                      <p className="text-sm tracking-body text-(--secondary) font-medium title-font">This will be displayed on your product listing.</p>
                                    </div>
                                    <div>
                                      <textarea 
                                        name="description" 
                                        value={formData.description} 
                                        onChange={handleInputChange} 
                                        placeholder="e.g. Classic slip-on design..." 
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border rounded-xl min-h-[100px] p-3' 
                                      />
                                    </div>
                                  </section>

                                  {/* CATEGORY SELECT */}
                                  <section className="w-full grid gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="space-y-1">
                                      <h2 className="text-lg tracking-body text-(--primary) custom3">Category Selection</h2>
                                      <p className="text-sm tracking-body text-(--secondary) font-medium title-font">This will be displayed on your product listing.</p>
                                    </div>
                                    <div>
                                      <select 
                                        name="category" 
                                        value={formData.category} 
                                        onChange={handleInputChange}
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3'
                                      >
                                        <option value="all">All Items</option>
                                        <option value="Fashion & Accessories">Fashion & Accessories</option>
                                        <option value="Books">Books</option>
                                        <option value="Study Essentials">Study Essentials</option>
                                        <option value="Electronics & Entertainment">Electronics & Entertainment</option>
                                        <option value="Clothing & Lifestyle">Clothing & Lifestyle</option>
                                        <option value="Other">Other</option>
                                      </select>
                                    </div>
                                  </section>

                                  {/* LISTING TYPE */}
                                  <section className="w-full grid gap-x-8 gap-y-6 sm:grid-cols-2 items-center">
                                    <div className="space-y-1">
                                      <h2 className="text-lg tracking-body text-(--primary) custom3">
                                        Listing Type: <span className={enabled ? "text-green-600" : "text-black"}>{enabled ? "For Sale" : "For Rent"}</span>
                                      </h2>
                                      <p className="text-sm tracking-body text-(--secondary) font-medium title-font">
                                        {enabled ? "This item will be listed for permanent purchase." : "This item will be listed for short-term rental."}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <span className={`text-sm tracking-body font-medium ${!enabled ? 'text-black' : 'text-(--secondary)'}`}>Rent</span>
                                      <Switch checked={enabled} onChange={setEnabled} className={`${enabled ? 'bg-green-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none`}><span className={`${enabled ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 transform rounded-full bg-white transition duration-200`} /></Switch>
                                      <span className={`text-sm tracking-body font-medium ${enabled ? 'text-green-600' : 'text-(--secondary)'}`}>Sale</span>
                                    </div>
                                  </section>

                                  {/* PRICE */}
                                  <section className="w-full grid gap-x-8 gap-y-6 sm:grid-cols-2">
                                    <div className="space-y-1">
                                      <h2 className="text-lg tracking-body text-(--primary) custom3">{enabled ? "Selling Price" : "Price per Hour"}</h2>
                                      <p className="text-sm tracking-body text-(--secondary) font-medium title-font">
                                        {enabled ? "The Least selling price is N100.00 and least selling Price the maximum is N1,000,000.00" : "Set your hourly rental rate. Minimum N100.00 per hour."}
                                      </p>
                                    </div>
                                    <div>
                                      <input 
                                        name="price" 
                                        type="text" 
                                        placeholder="e.g. 15,000" 
                                        value={formData.price} 
                                        onChange={handleInputChange} 
                                        className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3' 
                                      />
                                    </div>
                                  </section>

                                  {/* REPLACEMENT PRICE */}
                                  {!enabled && (
                                    <section className="w-full grid gap-x-8 gap-y-6 sm:grid-cols-2">
                                      <div className="space-y-1">
                                        <h2 className="text-lg tracking-body text-(--primary) custom3">Replacement Price</h2>
                                        <p className="text-sm tracking-body text-(--secondary) font-medium title-font">The Least selling price is N100.00 and least selling Price the maximum is N1,000,000.00</p>
                                      </div>
                                      <div>
                                        <input 
                                          name="replacementPrice" 
                                          type="text" 
                                          placeholder="45,000" 
                                          value={formData.replacementPrice} 
                                          onChange={handleInputChange} 
                                          className='w-full bg-(--card) title-font text-black border-gray-200 border h-10 leading-body tracking-body rounded-xl px-3' 
                                        />
                                      </div>
                                    </section>
                                  )}
                                </>
                              )}

                              {productVerificationStep === 2 && (
                                <>
                                  {/* PREVIEW UI - YOUR EXACT STRUCTURE */}
                                  <section className="w-full max-w-150 flex flex-col gap-5 justify-center items-center ">
                                      <div className="max-w-60 w-full overflow-hidden border border-gray-100 rounded-2xl aspect-[0.94/1]">
                                        <Image className="size-full object-cover" alt="preview" width={300} height={300} src={imagePreview} />
                                      </div>
                                      <h2 className="text-black leading-title tracking-body custom3 text-2xl text-center">
                                        {formData.title}
                                      </h2>
                                  </section>

                                  <section className="w-full flex rounded-2xl max-w-150 p-5 flex-col gap-5 bg-gray-100">
                                      <div className="w-full flex justify-between">
                                          <span className="text-base tracking-body custom3 text-black">Product details</span>
                                          <button onClick={() => setProductVerificationStep(1)} className="text-(--green) flex gap-1 items-center tracking-body text-sm title-font2 justify-center"><PencilIcon size={14} /> Edit</button>
                                      </div>
                                      <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between">
                                          <span className="text-sm tracking-body title-font2 text-(--secondary)">Product Name</span>
                                          <span className="text-sm sm:text-right flex-1 tracking-body title-font2 text-black">{formData.title}</span>
                                      </div>
                                      <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between">
                                          <span className="text-sm tracking-body title-font2 text-(--secondary)">Product Description</span>
                                          <span className="text-sm sm:text-right flex-1 tracking-body title-font2 text-black">{formData.description}</span>
                                      </div>
                                      <div className="w-full flex flex-col sm:flex-row gap-5 sm:gap-10 justify-between">
                                          <span className="text-sm tracking-body title-font2 text-(--secondary)">Product Category</span>
                                          <span className="text-sm sm:text-right flex-1 tracking-body title-font2 text-black">{formData.category}</span>
                                      </div>
                                  </section>

                                  <section className="w-full flex rounded-2xl max-w-150 p-5 flex-col gap-5 bg-gray-100">
                                      <div className="w-full flex justify-between">
                                          <span className="text-base tracking-body custom3 text-black">Pricing details</span>
                                          <button onClick={() => setProductVerificationStep(1)} className="text-(--green) flex gap-1 items-center tracking-body text-sm title-font2 justify-center"><PencilIcon size={14} /> Edit</button>
                                      </div>
                                      <div className="w-full flex gap-10 justify-between">
                                          <span className="text-sm tracking-body title-font2 text-(--secondary)">Product Cost</span>
                                          <span className="text-sm text-right flex-1 tracking-body title-font2 text-black">N{formData.price}</span>
                                      </div>
                                      <div className="w-full flex gap-10 justify-between">
                                          <span className="text-sm tracking-body title-font2 text-(--secondary)">Replacement Cost</span>
                                          <span className="text-sm text-right flex-1 tracking-body title-font2 text-black">N{enabled ? "0.00" : formData.replacementPrice}</span>
                                      </div>
                                  </section>
                                </>
                              )}
                            </div>

                            <div className="w-full flex justify-between mt-auto pt-10">
                              <button onClick={onClose} className="w-fit px-5 py-3 title-font hover:bg-gray-200 underline rounded-2xl text-sm text-(--secondary)">Cancel</button>
                              <div className="flex gap-4">
                                {productVerificationStep === 2 && (
                                  <button disabled={loading} onClick={() => setProductVerificationStep(1)} className="w-fit title-font2 px-5 py-3 bg-gray-200 rounded-xl text-sm text-black">Back</button>
                                )}
                                
                                <button 
  disabled={(productVerificationStep === 1 && !isFormValid) || loading}
  onClick={() => productVerificationStep === 1 ? setProductVerificationStep(2) : handleSubmit()} 
  className={`w-fit title-font2 px-5 py-3 rounded-xl text-sm text-white transition-all flex items-center gap-2 ${
    ((productVerificationStep === 1 && !isFormValid) || loading) 
      ? "bg-gray-300 cursor-not-allowed" 
      : "bg-green-600 hover:bg-green-700 active:scale-95"
  }`}
>
  {/* Label Logic */}
  {productVerificationStep === 1 ? "Preview Product" : (loading ? "Uploading..." : "Upload Product")}

  {/* Loader Logic */}
  {loading && (
    <div className="flex items-center space-x-1 ml-1">
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
    </div>
  )}
</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
    <SuccessModal
        isOpen={success}
        onClose={()=>setSuccess(false)}
        title="Item Created"
        message="The product details have been verified and uploaded. It’s ready for customers to see!"
        onContinue={viewProduct}
        buttonData="View Product"
    />
    <NetworkErrorModal
      isOpen={error}
      onClose={()=>setError(false)}
      errorMessage="Unable to upload product to begee check your network connection and try again"
      errorTitle="Upload Failed"onRetry={handleSubmit}
    />
    </>
  );
}