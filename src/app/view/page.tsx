'use client'

import { useState, useEffect } from "react";
import { User } from "../types/User";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUsers(json);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if(loading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center bg-gray-800 font-sans">
        <h1 className="md:text-5xl text-3xl m-6">Listagem de usuários</h1>
        <h1 className="md:text-1xl text-xl m-6">Carregando...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-800 font-sans">
      <h1 className="md:text-5xl text-3xl m-6">Listagem de usuários</h1>
      <div className="dark:text-white flex flex-col items-center justify-center border-1 border-zinc-200 rounded-xl bg-gray-900">
        <ul className="flex flex-col items-center justify-center p-6">
          {users.map((user) => (
            <div key={user.id} className="w-full">
            <li className="dark:text-white flex-col flex-1 items-center justify-center m-2">{user.name} | {user.email}</li>
            <hr />
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
