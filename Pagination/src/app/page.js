"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({});
  const [page, setPage] = useState(1);

  const fetchData = () => {
    // fetch("https://jsonplaceholder.typicode.com/albums/1/photos")
    //   .then((response) => response.json())
    //   .then((json) => setData(json));
  
  fetch("https://dummyjson.com/products?limit=100")
      .then((response) => response.json())
      .then((json) => setData(json.products));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const setPageInput = (input) => {
    if (input >= 1 && input <= data.length / 10 && input !== page)
      setPage(input);
  };

  return (
    <main className="min-h-screen">
      {data.length > 0 && (
        <div className="flex justify-center gap-4 items-center cursor-pointer">
          <span className={page>1?"":"opacity-0"} onClick={() => setPageInput(page - 1)}>◀</span>
          {[...Array(data.length / 10)].map((_, index) => (
            <span className={index+1==page?"border-2 p-2 bg-slate-900 text-white":"p-2" } onClick={() => setPageInput(index + 1)}>{index + 1}</span>
          ))}
          <span className={page==data.length/10?"opacity-0":""} onClick={() => setPageInput(page + 1)}>▶</span>
        </div>
      )}
      {data.length > 0 && (
        <div className="flex flex-wrap gap-8 m-4 justify-center ">
          {data.slice(page*10-10, page*10).map((elem) => {
            return (
              <div className="relative flex flex-col w-[400px] border-2 border-black">
                <div className="flex justify-center">
                <Image
                className="object-cover "
                  src={elem.thumbnail}
                  alt={elem.id}
                  width={250}
                  height={250}
                  loading="lazy"
                />
                </div>
                <h1 className="text-center">{elem.title}</h1>
              </div>
            );
          })}
        </div>
      )}
      {console.log(page)}
      {data.length > 0 && (
        <div className="flex justify-center gap-4 items-center cursor-pointer">
          <span className={page>1?"":"opacity-0"} onClick={() => setPageInput(page - 1)}>◀</span>
          {[...Array(data.length / 10)].map((_, index) => (
            <span className={index+1==page?"border-2 p-2 bg-slate-900 text-white":"p-2" } onClick={() => setPageInput(index + 1)}>{index + 1}</span>
          ))}
          <span className={page==data.length/10?"opacity-0":""} onClick={() => setPageInput(page + 1)}>▶</span>
        </div>
      )}
    </main>
  );
}
