import React from "react";
import Layout from "@/Layouts/Layout";
import InputText from "@/Components/InputText";
import { useState } from "react";
const MayoristaCreate = () => {
    const [form, setForm] = useState({
        nombre: "",
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    return (
        <Layout>
            <div className="py-10 px-20 flex flex-col gap-4 ">
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl">Nuevo Mayorista</h2>
                    <div className="flex flex-row gap-3">
                        <button className="bg-slate-800 px-3 py-2 text-white text-sm hover:bg-slate-900 hover:shadow-lg transition-all transform duration-300 rounded">
                            Crear Mayorista
                        </button>
                        <button className="bg-red-600 px-3 py-2 text-white text-sm hover:bg-red-700 hover:shadow-lg transition-all transform duration-300 rounded">
                            Cancelar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 bg-white shadow px-14 py-6 gap-10 border">
                    <div className="col-span-2 font-extrabold text-lg">
                        Información de mayorista
                    </div>
                    <InputText
                        label={"Nombre"}
                        id={"nombre"}
                        name={"nombre"}
                        onChange={handleChange}
                        required
                        placeholder={"Escriba el nombre del mayorista"}
                        type="text"
                    />
                    <InputText
                        label={"Empresa"}
                        id={"empresa"}
                        name={"empresa"}
                        onChange={handleChange}
                        required
                        placeholder={"Escriba el nombre de la empresa"}
                        type="text"
                    />
                    <InputText
                        label={"Correo electrónico"}
                        id={"correo"}
                        name={"correo"}
                        onChange={handleChange}
                        required
                        placeholder={"juan@correo.com"}
                        type="email"
                    />

                    <InputText
                        label={"Numero de telefono"}
                        id={"telefono"}
                        name={"telefono"}
                        onChange={handleChange}
                        required
                        placeholder={"4613702803"}
                        type="tel"
                    />

                    <InputText
                        label={"Correo electrónico"}
                        id={"correo"}
                        name={"correo"}
                        onChange={handleChange}
                        required
                        placeholder={"juan@correo.com"}
                        type="email"
                    />
                </div>

                <div className="grid grid-cols-2 bg-white shadow px-14 py-6 gap-10 border">
                    <div className="col-span-2 font-extrabold text-lg">
                        Dirección de envío
                    </div>
                    <InputText
                        label={"Nombre de contacto"}
                        id={"nombre_contacto"}
                        name={"nombre_contacto"}
                        onChange={handleChange}
                        required
                        placeholder={"Escriba el nombre del contacto"}
                        type="text"
                    />
                    <InputText
                        label={"Dirección"}
                        id={"direccion"}
                        name={"direccion"}
                        onChange={handleChange}
                        required
                        placeholder={"Ingrese la dirección"}
                        type="text"
                    />
                    <InputText
                        label={"Código Postal"}
                        id={"cp"}
                        name={"cp"}
                        onChange={handleChange}
                        required
                        placeholder={"38057"}
                        type="number"
                    />

                    <InputText
                        label={"Colonia"}
                        id={"colonia"}
                        name={"colonia"}
                        onChange={handleChange}
                        required
                        placeholder={"Seleccione la colonia"}
                        type="text"
                    />

                    <InputText
                        label={"Estado"}
                        id={"estado"}
                        name={"estado"}
                        onChange={handleChange}
                        required
                        placeholder={"Seleccione el estado"}
                        type="text"
                    />
                </div>
            </div>
        </Layout>
    );
};

export default MayoristaCreate;
