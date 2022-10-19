import React, { useEffect } from "react";
import Layout from "@/Layouts/Layout";
import InputText from "@/Components/InputText";
import { useState } from "react";
import InputNumber from "@/Components/InputNumber";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
import Pagination from "@/Components/Pagination";
const MayoristaCreate = (props) => {
    const { errors, mayoristas, status } = props;
    console.log(props);
    const [busqueda, setBusqueda] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

    const [mayoristasData, setMayoristasData] = useState(
        mayoristas.slice(indexOfFirstRecord, indexOfLastRecord)
    );
    const [nPages, setNPages] = useState(
        Math.ceil(mayoristas.length / recordsPerPage)
    );
    const [alerta, setAlerta] = useState(status ? true : false);
    useEffect(() => {
        if (status) {
            setTimeout(() => {
                setAlerta(false);
            }, 4000);
        }
    }, []);
    useEffect(() => {
        setMayoristasData(
            mayoristas.slice(indexOfFirstRecord, indexOfLastRecord)
        );
    }, [currentPage]);

    useEffect(() => {
        if (busqueda === "") {
            setNPages(Math.ceil(mayoristas.length / recordsPerPage));
        } else {
            setNPages(Math.ceil(mayoristasData.length / recordsPerPage));
        }
    }, [busqueda]);
    const handleBusqueda = (e) => {
        if (e.target.length < 1) {
            setMayoristasData(mayoristas);
            return;
        }
        setBusqueda(e.target.value);
        const mayoristasBusqueda = mayoristas.filter((element) =>
            Object.values(element).some((value) =>
                value
                    ?.toString()
                    .toUpperCase()
                    .includes(e.target.value.toString().toUpperCase())
            )
        );
        setMayoristasData(mayoristasBusqueda);
    };
    const handleBorrarFiltro = () => {
        setBusqueda("");
        setMayoristasData(
            mayoristas.slice(indexOfFirstRecord, indexOfLastRecord)
        );
        setCurrentPage(1);
    };
    return (
        <Layout>
            <div className="py-10 px-20 flex flex-col gap-8">
                {alerta && (
                    <div className=" flex w-full px-5 py-4 items-center bg-green-700 text-white font-bold">
                        Mayorista guardado correctamente
                    </div>
                )}

                <h2 className="text-2xl">Mayorista</h2>
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row w-1/3 gap-3">
                        <div className="relative items-center w-full">
                            <input
                                type="text"
                                name=""
                                id=""
                                className="w-full h-full border border-gray-300 shadow rounded"
                                placeholder="Buscar Mayorista"
                                onChange={handleBusqueda}
                                value={busqueda}
                            />
                            <label className="absolute right-5 top-1/4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </label>
                        </div>
                        <button
                            className="bg-slate-600 rounded text-white px-2 py-1"
                            onClick={handleBorrarFiltro}
                        >
                            Limpiar filtro
                        </button>{" "}
                    </div>

                    <div className="flex flex-row gap-3">
                        <button
                            className="bg-slate-800 px-3 py-2 text-white text-sm hover:bg-slate-900 hover:shadow-lg transition-all transform duration-300 rounded"
                            type="submit"
                            onClick={() =>
                                Inertia.visit(route("mayorista.create"))
                            }
                        >
                            Nuevo Mayorista
                        </button>
                    </div>
                </div>

                <table className="table-auto border-collapse border px-2 py-2 w-full overflow-scroll">
                    <thead className="bg-gray-200 border border-collapse">
                        <tr>
                            <th className="py-4 px-3 ">No.</th>
                            <th className="py-4 px-3 ">Nombre</th>
                            <th className="py-4 px-3 ">Empresa</th>
                            <th className="py-4 px-3 ">Correo</th>
                            <th className="py-4 px-3 ">Teléfono</th>
                            <th className="py-4 px-3 ">Descuento</th>
                            <th className="py-4 px-3 ">No. Cotizaciones</th>
                            <th className="py-4 px-3 ">No. Ordenes</th>
                            <th className="py-4 px-3 ">No. Solicitudes</th>
                            <th className="py-4 px-3 ">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mayoristasData.map((mayorista) => (
                            <tr key={mayorista.IdUser}>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {mayorista.IdUser}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {mayorista.Name}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {" "}
                                    {mayorista.BusinessName}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {mayorista.Email}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {mayorista.Phone}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {mayorista.Discount}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {0}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {0}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3">
                                    {" "}
                                    {0}
                                </td>
                                <td className="bg-white text-center border-y px-3 py-3 ">
                                    <div className="flex flex-row gap-3">
                                        <button>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                                />
                                            </svg>
                                        </button>
                                        <button>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full ">
                    <Pagination
                        nPages={nPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default MayoristaCreate;
