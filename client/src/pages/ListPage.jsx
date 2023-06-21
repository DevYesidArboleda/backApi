import axios from "axios";
import { React, useEffect, useState } from "react";

function ListPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/catalog_system/pub/products/search/")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);

  console.log(data);
  return (
    <div className="grid grid-cols-2 justify-center items-center gap-4">
        {
                data
                &&
                Object.entries(data).map(([key, value, idx]) => {
                    return  <div className="flex justify-center items-center">
                        <div class="flex justify-center items-center flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 md:max-w-xl md:flex-row">
                    <img
                      class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                      src={value.items[0].images[0].imageUrl}
                      alt="" />
                    <div class="flex flex-col justify-start p-6">
                      <h5
                        class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                        {value.productTitle}
                      </h5>
                      <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                      {value.metaTagDescriptio}
                      </p>
                      <p class="text-xs text-neutral-500 dark:text-neutral-300">
                      {value.productId}
                      </p>
                    </div>
                  </div>       
                    </div>                                 
                })
            }
    </div>
  );
}

export default ListPage;
