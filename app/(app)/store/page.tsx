"use client";
import MaxWidthContainer from "@/app/components/utils/maxWidthContainer";
import ProductCard from "@/app/components/utils/productCard";
import Image from "next/image";
import CookieBanner from "@/app/components/utils/toast";
import useFetch from "@/app/lib/useAsyncFetch";
import { getAllProducts } from "@/app/lib/async_data";
import NetworkEror from "@/app/components/utils/networkEror";
import { UploadProductModal } from "@/app/components/utils/uploadProductsModal";
import { useState, useMemo } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { useAuthStore } from "@/app/store/auth.store";
import { useRouter } from "next/navigation";

import airpod from "../../assets/images/airpods.webp";
import Shoe from "../../assets/images/shoe.jpg";
import perfume from "../../assets/images/bottle.jpg";
import bag from "../../assets/images/thimberland.jpg";

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
  const { user } = useAuthStore();
  const router = useRouter();
  const [productsfiltered, setProductsFiltered] = useState([]);
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
    error,
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
      const categoryMatch =
        activeCategory === "all" || product.category === activeCategory;
      const typeMatch = product.forSale === isForSale;
      return categoryMatch && typeMatch;
    });
    // mainproducts as dependency ensures it reshuffles only when fresh data arrives
  }, [mainproducts, activeCategory, isForSale]);

  return (
    <MaxWidthContainer>
      <div className="pt-18.75 w-full flex flex-col">
        {/* Hero Section */}

        <div className="pt-18 pb-25 mt-10 flex overflow-hidden relative border border-gray-200 bg-(--card) rounded-4xl flex-col justify-center gap-25">
          {/* <div className="w-45 h-65 lg:w-60 lg:h-75 -top-40 sm:-top-20  rounded-3xl -left-10  shadow-xl -rotate-20  bg-(--card) border-black overflow-hidden absolute ">
                              <Image
                                src={Watch}
                                alt='Short'
                                className='w-full h-full object-cover '
                                width={100}
                                height={100}
                                 sizes="100vw"
                              />
                        </div>
                        <div className="w-45 h-65 lg:w-60  lg:h-75 -bottom-40 sm:-bottom-20  rounded-3xl bg-(--card) -right-10   shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] rotate-20  border-black absolute overflow-hidden">
                                <Image
                                      src={Shoe}
                                      alt='Shoe'
                                      className='w-full  h-full object-cover '
                                      width={100}
                                      height={100}
                                       sizes="100vw"
                                    />
                              </div>
                        <div className="w-45 h-65 lg:w-60  lg:h-75 -bottom-40 sm:-bottom-20  rounded-3xl bg-(--card) -left-10   shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] rotate-20  border-black absolute overflow-hidden">
                                <Image
                                      src={Shoe}
                                      alt='Shoe'
                                      className='w-full  h-full object-cover '
                                      width={100}
                                      height={100}
                                       sizes="100vw"
                                    />
                              </div> */}
          <div className="w-30 h-45 lg:w-45 lg:h-65  -bottom-20  rounded-3xl bg-gray-200 -right-10 border-2 shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] -rotate-20  border-black absolute overflow-hidden">
            <Image
              src={airpod}
              alt="Shoe"
              className="w-full  h-full object-cover "
              width={100}
              height={100}
              sizes="100vw"
            />
          </div>
          <div className="w-30 h-45 lg:w-45 lg:h-65  -bottom-40  rounded-3xl bg-gray-200 lg:right-38   border-2 shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] -rotate-20  border-black hidden lg:flex absolute overflow-hidden">
            <Image
              src={bag}
              alt="Shoe"
              className="w-full  h-full object-cover "
              width={100}
              height={100}
              sizes="100vw"
            />
          </div>
          <div className="w-30 h-45 lg:w-45 lg:h-65  -bottom-20  rounded-3xl bg-gray-200  -left-10  border-2 shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] rotate-20  border-black absolute overflow-hidden">
            <Image
              src={perfume}
              alt="Shoe"
              className="w-full  h-full object-cover "
              width={100}
              height={100}
              sizes="100vw"
            />
          </div>
          <div className="w-30 h-45 lg:w-45 lg:h-65  -bottom-40  rounded-3xl bg-gray-200 hidden lg:flex left-38   border-2 shadow-[-15px_20px_25px_-5px_rgba(0,0,0,0.1),-8px_8px_10px_-6px_rgba(0,0,0,0.1)] rotate-20  border-black absolute overflow-hidden">
            <Image
              src={Shoe}
              alt="Shoe"
              className="w-full  h-full object-cover "
              width={100}
              height={100}
              sizes="100vw"
            />
          </div>
          <div className="w-full flex justify-center">
            <div className="w-full px-4 items-center justify-center max-w-180 flex flex-col gap-5">
              <div className="w-fit ">
                <h2 className="text-center custom8 text-5xl sm:text-6xl lg:text-[75px] text-(--primary) leading-none tracking-body">
                  Beegee <span className="text-green-600">Marketplace</span>
                </h2>
              </div>
              <div className="w-full max-w-100 flex flex-col justify-center items-center gap-5">
                <p className="text-center text-lg text-(--secondary) leading-body custom3 font-medium tracking-body">
                  Select a category to find textbooks, electronics, fashion, and
                  more from your fellow students
                </p>
              </div>
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
                className={`px-6 py-1 rounded-lg text-sm title-font2 transition-all ${isForSale ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"}`}
              >
                Buy
              </button>
              <button
                onClick={() => setIsForSale(false)}
                className={`px-6 py-1 rounded-lg text-sm title-font2 transition-all ${!isForSale ? "bg-black text-white shadow-sm" : "text-gray-500 hover:text-black"}`}
              >
                Rent
              </button>
            </div>
          </div>

          {/* Product Grid */}
          {loading && (
            <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
              {Array(8)
                .fill(null)
                .map((_, index) => (
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
              <p className="text-gray-400 title-font">
                No products found in this category.
              </p>
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
      {/* <CookieBanner /> */}
      <button
        onClick={() => {
          if (user) {
            setPModal(true);
          } else {
            router.push("/sign-in");
          }
        }}
        className="fixed bottom-8 border border-white right-4 cursor-pointer sm:right-8 z-50 flex items-center justify-center size-14 bg-black text-white rounded-full shadow-lg shadow-black/20 hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        <Plus
          size={28}
          className="transition-transform group-hover:rotate-90 duration-300"
        />
      </button>
      <UploadProductModal isOpen={pModal} onClose={() => setPModal(false)} />
    </MaxWidthContainer>
  );
}
