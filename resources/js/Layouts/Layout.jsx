import { Inertia } from "@inertiajs/inertia";
import React from "react";

const Layout = ({ children }) => {
    return (
        <>
            <div className="flex flex-row flex-1 min-h-screen z-0 ">
                <aside className="h-full w-56 bg-white px-2 gap-4 hidden md:flex md:flex-col">
                    <div className="w-3/4 mx-auto py-5">
                        <img src="/assets/img/logo.png" alt="" />
                    </div>
                    <div className="text-sm font-normal">Usuarios</div>
                    <div className="flex flex-col ">
                        <div
                            className="rounded-lg px-3 py-3 bg-gradient-to-r  from-blue-700 to-blue-500 text-white font-bold flex flex-row items-center gap-3 transition-all transform duration-300 hover:from-blue-800 hover:to-blue-600 hover:shadow hover:cursor-pointer "
                            onClick={() =>
                                Inertia.visit(route("mayorista.index"))
                            }
                        >
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
                                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                />
                            </svg>

                            <span> Mayorista</span>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 bg-gray-100">
                    <nav className="flex flex-col bg-white w-full h-16 shadow z-50 items-end">
                        <div className="flex flex-row items-center justify-center  h-full gap-4 mr-5">
                            <div className="flex flex-col">
                                <p className="text-end">Juan Pablo Marcial</p>
                                <p className="text-end">Admin</p>
                            </div>
                            <div className="rounded-full bg-slate-400  flex flex-col items-center justify-center w-12 h-12">
                                <span className="text-white  text-2xl">JP</span>
                            </div>
                        </div>
                    </nav>
                    {children}
                </div>
            </div>
        </>
    );
};

export default Layout;
