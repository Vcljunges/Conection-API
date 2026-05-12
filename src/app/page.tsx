'use client'

import { useState, useEffect } from "react";
 
export default function Home() {

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      });
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-black font-sans">
      <h1 className="md:text-5xl text-3xl m-6">Listagem de usuários</h1>
    </div>
  );
}
