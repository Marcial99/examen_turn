import React from "react";
import Layout from "@/Layouts/Layout";
import InputText from "@/Components/InputText";
import { useState } from "react";
import InputNumber from "@/Components/InputNumber";
import axios from "axios";
import { Inertia } from "@inertiajs/inertia";
const MayoristaCreate = (props) => {
    const { errors } = props;
    console.log(errors);
    const [usuario, setUsuario] = useState({
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        descuento: 0,
    });
    const [envio, setEnvio] = useState({
        nombre_contacto: "",
        direccion: "",
        cp: "",
        colonia: "",
        ciudad: "",
        estado: "",
        email: "",
        telefono: "",
    });
    const [facturacion, setFacturacion] = useState({
        nombre_contacto: "",
        direccion: "",
        cp: "",
        colonia: "",
        ciudad: "",
        estado: "",
        email: "",
        telefono: "",
    });

    const [facturacionInfo, setFacturacionInfo] = useState({
        razon: "",
        cfdi: "",
        rfc: "",
    });
    const [direccionIgual, setDireccionIgual] = useState(false);
    const [colonias, setColonias] = useState([]);
    const [coloniasB, setColoniasB] = useState([]);
    const [errorCP, setErrorCP] = useState(false);
    const [errorCPB, setErrorCPB] = useState(false);

    const handleUsuario = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value });
    };

    const handleEnvio = (e) => {
        setEnvio({ ...envio, [e.target.name]: e.target.value });
    };
    const handleFacturacion = (e) => {
        setFacturacion({ ...facturacion, [e.target.name]: e.target.value });
    };

    const handleFacturacionInfo = (e) => {
        setFacturacionInfo({
            ...facturacionInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleDireccionIgual = () => {
        setDireccionIgual(!direccionIgual);
        setFacturacion({ ...envio });
        setColoniasB([...colonias]);
    };
    const handleCP = (e) => {
        if (e.target.value.length > 5) {
            return;
        }
        setErrorCP(false);
        setEnvio({ ...envio, [e.target.name]: e.target.value });
        if (e.target.value.length === 5) {
            const getData = async () => {
                try {
                    const { data } = await axios.get(`/cp/${e.target.value}`);
                    console.log(data);
                    if (data.CCp) {
                        const values = await Promise.allSettled([
                            axios.get(`/neighborhoods/${e.target.value}`),
                            axios.get(`/ciudad/${e.target.value}`),
                            axios.get(`/estado/${e.target.value}`),
                        ]);
                        if (values[0].status === "fulfilled") {
                            setColonias(values[0].value.data);
                        }
                        if (
                            values[1].status === "fulfilled" &&
                            values[2].status === "fulfilled"
                        ) {
                            setEnvio({
                                ...envio,
                                ciudad: values[1].value.data.Descripcion,
                                estado: values[2].value.data.NombreEstado,
                                [e.target.name]: e.target.value,
                            });
                        }
                    }
                } catch (error) {
                    console.log(error.response);
                    if (error.response.status === 404) {
                        setColonias([]);
                        setEnvio({
                            ...envio,
                            ciudad: "",
                            estado: "",
                            [e.target.name]: e.target.value,
                        });

                        setErrorCP(true);
                    }
                }
            };
            getData();
        }
    };

    const handleCPB = (e) => {
        if (e.target.value.length > 5) {
            return;
        }
        setErrorCPB(false);
        setFacturacion({ ...facturacion, [e.target.name]: e.target.value });
        if (e.target.value.length === 5) {
            const getData = async () => {
                try {
                    const { data } = await axios.get(`/cp/${e.target.value}`);
                    console.log(data);
                    if (data.CCp) {
                        const values = await Promise.allSettled([
                            axios.get(`/neighborhoods/${e.target.value}`),
                            axios.get(`/ciudad/${e.target.value}`),
                            axios.get(`/estado/${e.target.value}`),
                        ]);
                        if (values[0].status === "fulfilled") {
                            setColoniasB(values[0].value.data);
                        }
                        if (
                            values[1].status === "fulfilled" &&
                            values[2].status === "fulfilled"
                        ) {
                            setFacturacion({
                                ...facturacion,
                                ciudad: values[1].value.data.Descripcion,
                                estado: values[2].value.data.NombreEstado,
                                [e.target.name]: e.target.value,
                            });
                        }
                    }
                } catch (error) {
                    console.log(error.response);
                    if (error.response.status === 404) {
                        setColoniasB([]);
                        setFacturacion({
                            ...facturacion,
                            ciudad: "",
                            estado: "",
                            [e.target.name]: e.target.value,
                        });

                        setErrorCPB(true);
                    }
                }
            };
            getData();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        Inertia.post(route("mayorista.store"), {
            usuario: { ...usuario },
            envio: { ...envio },
            facturacion: { ...facturacion },
            facturacionInfo: { ...facturacionInfo },
        });
        console.log("enviado");
    };
    return (
        <Layout>
            <form
                onSubmit={handleSubmit}
                className="py-10 md:px-20 px-8 flex flex-col gap-8 "
            >
                <div className="flex flex-row justify-between">
                    <h2 className="text-2xl">Nuevo Mayorista</h2>
                    <div className="flex flex-row gap-3">
                        <button
                            className="bg-slate-800 px-3 py-2 text-white text-sm hover:bg-slate-900 hover:shadow-lg transition-all transform duration-300 rounded"
                            type="submit"
                        >
                            Crear Mayorista
                        </button>
                        <button
                            className="bg-red-600 px-3 py-2 text-white text-sm hover:bg-red-700 hover:shadow-lg transition-all transform duration-300 rounded"
                            type="button"
                            onClick={() =>
                                Inertia.visit(route("mayorista.index"))
                            }
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                <div className=" grid grid-cols-1 md:grid-cols-2 bg-white shadow md:px-14 px-8 py-6 gap-6 md:gap-10 border">
                    <div className="col-span-1 md:col-span-2 font-extrabold text-lg">
                        Información de mayorista
                    </div>
                    <InputText
                        label={"Nombre"}
                        id={"nombre"}
                        name={"nombre"}
                        onChange={handleUsuario}
                        placeholder={"Escriba el nombre del mayorista"}
                        type="text"
                        value={usuario.nombre}
                        error={errors["usuario.nombre"]}
                        textError={errors["usuario.nombre"]}
                        required
                    />
                    <InputText
                        label={"Empresa"}
                        id={"empresa"}
                        name={"empresa"}
                        onChange={handleUsuario}
                        placeholder={"Escriba el nombre de la empresa"}
                        type="text"
                        value={usuario.empresa}
                        error={errors["usuario.empresa"]}
                        textError={errors["usuario.empresa"]}
                        required
                    />
                    <InputText
                        label={"Correo electrónico"}
                        id={"email"}
                        name={"email"}
                        onChange={handleUsuario}
                        placeholder={"juan@correo.com"}
                        type="email"
                        value={usuario.email}
                        error={errors["usuario.email"]}
                        textError={errors["usuario.email"]}
                        required
                    />

                    <InputText
                        label={"Numero de telefono"}
                        id={"telefono"}
                        name={"telefono"}
                        onChange={handleUsuario}
                        placeholder={"4613702803"}
                        type="tel"
                        value={usuario.telefono}
                        error={errors["usuario.telefono"]}
                        textError={errors["usuario.telefono"]}
                        required
                    />

                    <InputNumber
                        label={"Porcentaje de descuento"}
                        id={"descuento"}
                        name={"descuento"}
                        onChange={handleUsuario}
                        placeholder={"juan@correo.com"}
                        min={0}
                        max={100}
                        value={usuario.descuento}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow md:px-14 px-8 py-6 gap-6 md:gap-10 border">
                    <div className="col-span-1 md:col-span-2 font-extrabold text-lg">
                        Dirección de envío
                    </div>
                    <InputText
                        label={"Nombre de contacto"}
                        id={"nombre_contacto"}
                        name={"nombre_contacto"}
                        onChange={handleEnvio}
                        placeholder={"Escriba el nombre del contacto"}
                        type="text"
                        value={envio.nombre_contacto}
                    />
                    <InputText
                        label={"Dirección"}
                        id={"direccion"}
                        name={"direccion"}
                        onChange={handleEnvio}
                        placeholder={"Ingrese la dirección"}
                        type="text"
                        value={envio.direccion}
                    />
                    <InputText
                        label={"Código Postal"}
                        id={"cp"}
                        name={"cp"}
                        onChange={handleCP}
                        placeholder={"38057"}
                        type="number"
                        value={envio.cp}
                        error={errorCP}
                        textError="El CP no fue encontrado"
                    />

                    <div className="flex flex-col gap-3">
                        <label
                            htmlFor={"colonia"}
                            className="block font-black text-sm"
                        >
                            Colonia{" "}
                        </label>
                        <select
                            name="colonia"
                            id="colonia"
                            value={envio.colonia}
                            onChange={handleEnvio}
                            className={`px-2 py-3 w-full ring-0 border-gray-400`}
                        >
                            <option value="">Selecciona la colonia</option>
                            {colonias.map((colonia) => (
                                <option key={colonia.CColonia}>
                                    {colonia.CNombreAsentamiento}
                                </option>
                            ))}
                        </select>
                    </div>

                    <InputText
                        label={"Ciudad"}
                        id={"ciudad"}
                        name={"ciudad"}
                        onChange={handleEnvio}
                        placeholder={"Ingrese la ciudad"}
                        type="text"
                        readOnly
                        value={envio.ciudad}
                    />

                    <InputText
                        label={"Estado"}
                        id={"estado"}
                        name={"estado"}
                        onChange={handleEnvio}
                        placeholder={"Seleccione el estado"}
                        type="text"
                        value={envio.estado}
                        readOnly
                    />

                    <InputText
                        label={"Correo electrónico"}
                        id={"email"}
                        name={"email"}
                        onChange={handleEnvio}
                        placeholder={"juan@correo.com"}
                        type="email"
                        value={envio.email}
                    />

                    <InputText
                        label={"Numero de telefono"}
                        id={"telefono"}
                        name={"telefono"}
                        onChange={handleEnvio}
                        placeholder={"4613702803"}
                        type="tel"
                        value={envio.telefono}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow md:px-14 px-8 py-6 gap-6 md:gap-10 border">
                    <div className="col-span-1 md:col-span-2 ">
                        <div className="flex flex-row justify-between">
                            <h2 className="font-extrabold text-lg">
                                Dirección de facturación
                            </h2>
                            <div className="flex flex-row items-center gap-3">
                                <input
                                    type="checkbox"
                                    name="direccionIgual"
                                    id="direccionIgual"
                                    value={direccionIgual}
                                    onChange={handleDireccionIgual}
                                />
                                <label
                                    htmlFor="direccionIgual"
                                    className="font-bold "
                                >
                                    Usar dirección de envio
                                </label>
                            </div>
                        </div>
                    </div>
                    {!direccionIgual && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                            <InputText
                                label={"Nombre de contacto"}
                                id={"bnombre_contacto"}
                                name={"nombre_contacto"}
                                onChange={handleFacturacion}
                                placeholder={"Escriba el nombre del contacto"}
                                type="text"
                                value={facturacion.nombre_contacto}
                            />
                            <InputText
                                label={"Dirección"}
                                id={"bdireccion"}
                                name={"direccion"}
                                onChange={handleFacturacion}
                                placeholder={"Ingrese la dirección"}
                                type="text"
                                value={facturacion.direccion}
                            />
                            <InputText
                                label={"Código Postal"}
                                id={"bcp"}
                                name={"cp"}
                                onChange={handleCPB}
                                placeholder={"38057"}
                                type="number"
                                value={facturacion.cp}
                                error={errorCPB}
                                textError="El CP no fue encontrado"
                            />

                            <div className="flex flex-col gap-3">
                                <label
                                    htmlFor={"colonia"}
                                    className="block font-black text-sm"
                                >
                                    Colonia{" "}
                                </label>
                                <select
                                    name="colonia"
                                    id="coloniaB"
                                    value={facturacion.colonia}
                                    onChange={handleFacturacion}
                                    className={`px-2 py-3 w-full ring-0 border-gray-400`}
                                >
                                    <option value="">
                                        Selecciona la colonia
                                    </option>
                                    {coloniasB.map((colonia) => (
                                        <option key={colonia.CColonia}>
                                            {colonia.CNombreAsentamiento}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <InputText
                                label={"Ciudad"}
                                id={"ciudad"}
                                name={"ciudad"}
                                onChange={handleFacturacion}
                                required
                                placeholder={"Ingrese la ciudad"}
                                type="text"
                                readOnly
                                value={facturacion.ciudad}
                            />

                            <InputText
                                label={"Estado"}
                                id={"estado"}
                                name={"estado"}
                                onChange={handleFacturacion}
                                placeholder={"Seleccione el estado"}
                                type="text"
                                readOnly
                                value={facturacion.estado}
                            />

                            <InputText
                                label={"Correo electrónico"}
                                id={"email"}
                                name={"email"}
                                onChange={handleFacturacion}
                                placeholder={"juan@correo.com"}
                                type="email"
                                value={facturacion.email}
                            />

                            <InputText
                                label={"Numero de telefono"}
                                id={"telefono"}
                                name={"telefono"}
                                onChange={handleFacturacion}
                                placeholder={"4613702803"}
                                type="tel"
                                value={facturacion.telefono}
                            />
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 bg-white shadow md:px-14 px-8 py-6 gap-6 md:gap-10 border">
                    <div className="col-span-12 font-extrabold text-lg">
                        Datos de facturación
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <InputText
                            label={"Razón social"}
                            id={"razon"}
                            name={"razon"}
                            onChange={handleFacturacionInfo}
                            placeholder={"Escriba la razón social"}
                            type="text"
                            value={facturacionInfo.razon}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <InputText
                            label={"Uso de CFDI"}
                            id={"cfdi"}
                            name={"cfdi"}
                            onChange={handleFacturacionInfo}
                            placeholder={"Ingresa el CFDI"}
                            type="text"
                            value={facturacionInfo.cfdi}
                        />
                    </div>
                    <div className="col-span-12 md:col-span-6">
                        <InputText
                            label={"RFC"}
                            id={"rfc"}
                            name={"rfc"}
                            onChange={handleFacturacionInfo}
                            placeholder={"Escriba el RFC"}
                            type="text"
                            value={facturacionInfo.rfc}
                        />
                    </div>
                </div>
            </form>
        </Layout>
    );
};

export default MayoristaCreate;
