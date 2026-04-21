"use client";

import { Fragment, useEffect, useState, useRef, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { MoveUpLeft, X } from "lucide-react";
import { getAllProducts } from "@/app/lib/async_data";
import { useProductStore } from "@/app/store/products.store";
import { NetworkErrorModal } from "./networkErrorModal";

export default function CommandPalette() {
  
  const [query, setQuery] = useState("");
  const {searchQuery,setSearchQuery} =useProductStore()
  const [results, setResults] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const [error,setError] = useState(false);
  const router = useRouter();
  /* keyboard shortcut: ⌘K / CtrlK toggles palette */
  const handlePush = (data: string) => {
    router.push(data);
    setSearch(false);
    setSearchQuery(false);
  };
  const {setSelectedProduct} =useProductStore()
  /* reset search text whenever we close */
  useEffect(() => {
    if (!search) setQuery("");
  }, [searchQuery]);
  async function petch() {
    try {
    setLoading(true);
    const data: any = await getAllProducts(query);
    const result: any = await data;
      if (!result || result === undefined) {
        setResults([])
      } else {
        setResults(result.products);
      }
    } catch (error) {
      console.log(error)
      setError(true)
    }finally{
      setLoading(false)
    }
  }
  /* --------------------------------------------------------------------- */
  useEffect(() => {
    // 1️⃣ Ignore empty queries
    if (!query.trim()) {
      setResults({});
      setLoading(false);
      return;
    }
    // 2️⃣ Debounce: fire only after 300 ms of silence
    const id = setTimeout(() => {
      // 3️⃣ Cancel the previous in-flight request (if any)
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      petch();
    }, 500);

    // // Cleanup for the debounce timer
    return () => clearTimeout(id);
  }, [query]);
  return (
    <>
      <Transition show={searchQuery} as={Fragment}>
      <Dialog
        onClose={() => {
          setSearch(false);
          setSearchQuery(false);
        }}
        className="fixed bg-black/60 inset-0 z-50"
      >
        {/* backdrop */}
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="absolute inset-0 hidden bg-black/60" />
        </Transition.Child>

        {/* panel */}
        <Transition.Child
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-50 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-50 scale-95"
        >
          <Dialog.Panel className="mx-auto mt-0 sm:bg-transparent sm:max-h-90vh w-full  h-screen sm:pb-10">
            <Command className="max-h-full overflow-y-auto w-full  sm:shadow-2xl py-10 bg-foreground">
              <div className="w-full">
                <div className="w-full m-auto max-w-3xl sticky top-0 flex flex-row px-4">
                  {/* search input */}
                  <div className="border-2 sticky bg-(--card) flex-1 rounded-full top-0 border-gray-200 z-10  h-[60px] flex flex-row gap-1">
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="What are you searching for…"
                      className="flex-1  px-5 title-font  text-black bg-transparent py-3 text-lg sm:text-xl
                                            outline-none focus:ring-2 rounded-full focus:ring-green-600 placeholder:text-zinc-400"
                      autoFocus
                    />
                    {
                      loading && <div
                      className="h-full absolute right-2 flex items-center px-2"
                    >
                     <div role="status">
                        <svg aria-hidden="true" className="size-6 text-gray-200 animate-spin fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="green"/>
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    </div>
                    }
                  </div>
                  <div className=" h-[60px] flex items-center">
                    <button
                      className="h-full  flex  items-center px-2"
                      onClick={() => setSearchQuery(false)}
                    >
                      <X size={20} className="text-gray-500" />
                    </button>
                  </div>
                </div>
                {/* results */}
                <Command.List className="h-fit w-full  max-w-3xl m-auto  p-2 flex flex-col">
                  {/* {query && results && <Command.Item tabIndex={-1} className='flex-1 aria-selected:bg-[hsl(var(--accent))] flex px-2 py-2 cursor-pointer rounded-lg'> 
                        <div className='w-full flex-1 h-10 rounded-xl flex flex-row ' onClick={()=>handlePush(`/explore/${query}`)}>
                            <div className='h-full aspect-square flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="stroke-black dark:stroke-white"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
                            </div>
                            <div className='flex-1 h-full flex items-center '>
                                <div>
                                    <span className='text-[--color] text-sm'>Search for <b>{query}</b></span>
                                </div>
                            </div>
                        </div>
                    </Command.Item>} */}

                  {query && results.length && !loading && (
                    <Command.Item
                      // key={index}
                      // value={cmd._id}
                      // onSelect={() => {
                      //     setSearch(false)
                      //     router.push(`/${cmd.username}`)
                      // }}
                      className="flex flex-col cursor-pointer items-center
                                    rounded-md px-3 py-2 text-base "
                    >
                      <h3 className="text-lg text-black title-font2 w-full mb-1">Products</h3>
                      {results.map((item: Product, index: number) => (
                        <div
                          key={index}
                          className="w-full flex-1 flex flex-row py-1.5 justify-between"
                          onClick={() => {
                            setSelectedProduct(item)
                            setSearch(false);
                            setSearchQuery(false);
                          }}
                        >
                          <div className="h-full text-(--secondary) tracking-body title-font2 hover:underline">
                            <p>{item.title}</p>
                          </div>
                        </div>
                      ))}
                    </Command.Item>
                  )}
                   {query && !loading && !results.length && (
                      <Command.Item
                      // key={index}
                      // value={cmd._id}
                      // onSelect={() => {
                      //     setSearch(false)
                      //     router.push(`/${cmd.username}`)
                      // }}
                      className="flex flex-col cursor-pointer items-center
                                     px-3 py-2 text-sm text-[--color]
                                    aria-selected:bg-zinc-100 dark:aria-selected:bg-[hsl(var(--accent))]"
                    >
                      
                        <div
                          className="w-full flex-1 flex flex-row py-1.5 justify-between"
                        >
                          <div className="h-full text-(--secondary) tracking-body title-font2 hover:underline">
                            <p>No products found</p>
                          </div>
                        </div>
                    
                    </Command.Item>
                   )}
                  {/* <Command.Empty className="p-3 text-center text-xs text-zinc-500">
                        No result
                    </Command.Empty> */}
                </Command.List>
              </div>
            </Command>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
    <NetworkErrorModal onRetry={petch} isOpen={error} onClose={()=>setError(false)} />

    </>
  );
}
