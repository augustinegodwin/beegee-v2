import Image from "next/image";
import bookmark from "@/app/assets/images/bookmark.svg";
import { useProductStore } from "@/app/store/products.store";
import { useRouter } from "next/navigation";
import { formatPrice } from "./formatPrice";
export default function ProductCard( product:Product) {
  const { setSelectedProduct,addToCart } = useProductStore();
  const router = useRouter();
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full overflow-hidden image-curtain relative aspect-[0.882609/1] border-gray-200 bg-(--card) rounded-xl ">
        <Image
          src={product.image[0].url}
          alt={product.title}
          className="size-full relative  object-cover"
          width={100}
          sizes="100vw"
          height={100}
        />
      </div>
      <div className="w-ful flex flex-col gap-2.5">
        <div className="w-full">
          <p className=" leading-body line-clamp-2 tracking-body lg:text-base text-sm text-(--primary) custom3">
            {product.title}
          </p>
        </div>
        <div className="flex w-full justify-between items-center">
          {product.availabilityStatus ? (
            <p className=" leading-body tracking-body text-sm custom3 text-(--green)">
              Avaliable
            </p>
          ) : (
            <p className=" leading-body tracking-body text-sm custom3 text-(--warning)">
              Unavaliable
            </p>
          )}
          <p className="leading-body tracking-body custom7 text-base text-(--primary)">
            {formatPrice(Number(product.price))} <i></i>
          </p>  
        </div>
        <div className="flex gap-2">
          {product.availabilityStatus ? (
            <button 
            onClick={()=>{
                            
                                    addToCart(product,1)
                                    router.push("/checkout")
                                  }}
            className="w-full cursor-pointer px-5 py-2 custom3 bg-black transition-all rounded-lg font-medium leading-[1.1] tracking-body text-sm text-white ">
              {product.forSale ? "Buy" : "Rent"}
            </button>
          ) : (
            <button disabled className="w-full cursor-pointer px-5 py-2 custom3 bg-(--green) transition-all rounded-lg font-medium leading-[1.1] tracking-body text-sm text-white ">
              {product.forSale ? "Buy" : "Rent"}
            </button>
          )}
           <button className="w-full cursor-pointer px-5 py-2 custom3 bg-gray-200  border-gray-200 transition-all rounded-lg font-medium leading-[1.1] tracking-body text-sm text-black " onClick={()=>setSelectedProduct(product)}>
              View
            </button>
        </div>
      </div>
    </div>
  );
}