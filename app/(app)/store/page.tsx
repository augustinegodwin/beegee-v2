"use client"
import Button from "@/app/components/utils/button";
import FilterCard from "@/app/components/utils/filterCard";
import MaxWidthContainer from "@/app/components/utils/maxWidthContainer";
import ProductCard from "@/app/components/utils/productCard";
import category from "@/app/assets/images/filter.svg";
import SwitchCard from "@/app/components/utils/switchCard";
import Image from "next/image";
import bg from "@/app/assets/images/bg.avif";
import { ProductModal } from "@/app/components/utils/product-details";
import CookieBanner from "@/app/components/utils/toast";
import useFetch from "@/app/lib/useAsyncFetch";
import { getAllProducts } from "@/app/lib/async_data";
import Spinner from "@/app/components/utils/spinner";
import NetworkEror from "@/app/components/utils/networkEror";
import { UploadProductModal } from "@/app/components/utils/uploadProductsModal";
import { useState, useMemo } from "react";
// ... (your existing imports)
import { Plus, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { useRouter } from "next/navigation";

// Updated filter items (removed active boolean as we use state now)
const filterItems = [
  { title: "All Items", slug: "all" },
  { title: "Books", slug: "Books" },
  { title: "Fashion & Accessories", slug: "Fashion & Accessories" },
  { title: "Study Essentials", slug: "Study Essentials" },
  { title: "Electronics & Entertainment", slug: "Electronics & Entertainment" },
  { title: "Clothing & Lifestyle", slug: "Clothing & Lifestyle" },
  { title: "Other", slug: "Other" },
];
const ProductSkeleton = () => {

  return (
    <div 
      className="w-full flex flex-col gap-4 animate-pulse [mask-image:linear-gradient(to_bottom,white_100%,transparent_100%)]"
      // Note: 'black' in a mask means 100% visible, 'transparent' means 0% visible.
    >
      {/* Image Placeholder */}
      <div className="w-full overflow-hidden relative aspect-[0.882609/1] bg-gray-200 rounded-2xl" />

      <div className="w-full flex flex-col gap-2.5">
        {/* Title Placeholder */}
        <div className="w-full space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        {/* Status and Price Placeholder */}
        <div className="flex w-full justify-between items-center">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>

        {/* Buttons Placeholder */}
        <div className="flex gap-2">
          <div className="h-8 w-full bg-black/50 rounded-lg" />
          <div className="h-8 w-full bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
};
export default function Page() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pModal, setPModal] = useState(false);
  const {user}=useAuthStore()
  const router = useRouter();
  const [productsfiltered,setProductsFiltered]=useState([])
  const shuffleArray = (array: any[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};
  // --- FILTER STATES ---
  const [activeCategory, setActiveCategory] = useState("all");
  const [isForSale, setIsForSale] = useState(true); // true = Buy (For Sale), false = Sell (Rent/Swap)

  const {
    data: products,
    loading,
    refetch,
    error
  } = useFetch({
    fn: (params) => getAllProducts(params.searchparam || ""),
    params: { searchparam: "" },
  });

  const mainproducts: Product[] = products?.products || [];

  // --- FILTERING LOGIC ---
  const filteredProducts = useMemo(() => {
    // 1. First, create a shuffled version of the main list
    const shuffled = shuffleArray(mainproducts);

    // 2. Then, filter that shuffled list
    return shuffled.filter((product) => {
      const categoryMatch = activeCategory === "all" || product.category === activeCategory;
      const typeMatch = product.forSale === isForSale;
      return categoryMatch && typeMatch;
    });
    // mainproducts as dependency ensures it reshuffles only when fresh data arrives
  }, [mainproducts, activeCategory, isForSale]);
  
  return (
    <MaxWidthContainer>
      <div className="pt-18.75 w-full flex flex-col">
        {/* Hero Section */}
        <div className="w-full mt-10 py-25 p-5 bg-(--green) border rounded-3xl relative border-gray-200">
          <div className="w-full flex justify-center text-center">
            <div className="w-full items-center justify-center max-w-150 flex flex-col gap-5">
            <h2 className="custom4  text-[40px] sm:text-5xl lg:text-[65px] text-white leading-none tracking-header">
                Marketplace
              </h2>
              <p className="text-lg text-white/75 custom3 font-medium tracking-body">
                HOME / STORE
              </p>
            </div>
          </div>
        </div>

        <div className="w-full py-10 lg:py-25 gap-5 flex flex-col">
          {/* Toolbar: Category Select & Buy/Sell Switch */}
          <div className="w-full flex justify-between items-center gap-5 flex-row">
            
            {/* 1. Category Dropdown (Responsive) */}
            <div className="relative w-fit">
              <select
                value={activeCategory}
                onChange={(e) => setActiveCategory(e.target.value)}
                className="w-full appearance-none bg-(--card) text-sm rounded-xl px-4 py-2 title-font tracking-header text-(--secondary) focus:outline-none focus:ring-2 focus:ring-green-500 cursor-pointer"
              >
                {filterItems.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.title}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-(--secondary)">
                <ChevronDown size={18} />
              </div>
            </div>

            {/* 2. Buy/Sell Switch */}
            <div className="w-fit flex items-center bg-gray-100 p-1 rounded-xl">
               <button 
                onClick={() => setIsForSale(true)}
                className={`px-6 py-1 rounded-lg text-sm title-font2 transition-all ${isForSale ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'}`}
               >
                 Buy
               </button>
               <button 
                onClick={() => setIsForSale(false)}
                className={`px-6 py-1 rounded-lg text-sm title-font2 transition-all ${!isForSale ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'}`}
               >
                 Rent
               </button>
            </div>
          </div>

          {/* Product Grid */}
          {loading && (
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(8).fill(null).map((_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          )}

          {!loading && filteredProducts.length > 0 && (
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
              {filteredProducts.map((product: Product) => (
                <ProductCard key={product._id} {...product} />
              ))}
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="w-full py-20 text-center">
              <p className="text-gray-400 title-font">No products found in this category.</p>
            </div>
          )}

          {!loading && error && !filteredProducts.length && (
            <div className="py-25">
              <NetworkEror />
            </div>
          )}
        </div>
      </div>

      {/* Modals & Floating Buttons */}
      {/* <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
      <CookieBanner />
      <button
        onClick={() => {
          
          if (user){
            setPModal(true)
          }else{
              router.push("/sign-in")
          }
        }}
        className="fixed bottom-8 right-4 cursor-pointer sm:right-8 z-50 flex items-center justify-center size-14 bg-black text-white rounded-full shadow-lg shadow-black/20 hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        <Plus size={28} className="transition-transform group-hover:rotate-90 duration-300" />
      </button>
      <UploadProductModal isOpen={pModal} onClose={() => setPModal(false)} />
    </MaxWidthContainer>
  );
}