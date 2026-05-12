'use client'

import { useState } from "react";
import { Cep } from "../types/Cep";

export default function Home() {
    const [cepData, setCepData] = useState<Cep[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");

    const getCep = async () => {
        const cleanedCep = searchInput.replace(/\D/g, "");
        if (!cleanedCep) {
            alert("Digite um CEP válido!");
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`https://brasilapi.com.br/api/cep/v1/${cleanedCep}`);
            if (!res.ok) {
                throw new Error("CEP não encontrado");
            }
            const json = await res.json();
            
            const mappedCep: Cep = {
                cep: json.cep,
                rua: json.street || "Não informada",
                bairro: json.neighborhood || "Não informado",
                cidade: json.city || "Não informada",
                estado: json.state || "Não informado"
            };

            setCepData([mappedCep]);
        } catch (error) {
            console.log("ERROR: ", error);
            alert("Houve um erro ao buscar o CEP!");
            setCepData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-gray-800 font-sans min-h-screen">
            <h1 className="md:text-5xl text-3xl m-6 text-white">Buscar CEP</h1>

            <div className="flex flex-col items-center justify-center p-6 bg-gray-900 border border-zinc-200 rounded-xl mb-6 w-11/12 max-w-md">
                <input
                    type="text"
                    className="p-2 mb-4 w-full rounded"
                    placeholder="Digite o CEP (ex: 96880-000)"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                    onClick={getCep}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition-colors"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </button>
            </div>

            <div className="dark:text-white flex flex-col items-center justify-center border border-zinc-200 rounded-xl bg-gray-900 w-11/12 max-w-md">
                {loading ? (
                    <h1 className="md:text-xl text-lg m-6">Carregando...</h1>
                ) : cepData.length === 0 ? (
                    <h1 className="md:text-xl text-lg m-6">Nenhum CEP encontrado!</h1>
                ) : (
                    <ul className="flex flex-col items-center justify-center p-6 w-full">
                        {cepData.map((cepItem) => (
                            <div key={cepItem.cep} className="w-full">
                                <hr className="my-2 border-zinc-700" />
                                <li className="dark:text-white flex flex-col flex-1 items-start justify-start m-2">
                                    <span className="font-bold mx-2 text-blue-400">CEP: {cepItem.cep}</span>
                                    <span className="font-bold mx-2 text-blue-400">Rua: {cepItem.rua}</span>
                                    <span className="font-bold mx-2 text-blue-400">Bairro: {cepItem.bairro}</span>
                                    <span className="font-bold mx-2 text-blue-400">Cidade: {cepItem.cidade}</span>
                                    <span className="font-bold mx-2 text-blue-400">Estado: {cepItem.estado}</span>
                                </li>
                                <hr className="my-2 border-zinc-700" />
                            </div>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
