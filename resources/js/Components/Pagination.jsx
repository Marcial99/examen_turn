import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="flex flex-row w-full items-center justify-center">
            <ul className="flex flex-row gap-2 w-full items-center justify-center">
                <li>
                    <a
                        href="#"
                        onClick={prevPage}
                        className="bg-white px-2 py-2 font-bold hover:shadow rounded-lg transition-all transform duration-300"
                    >
                        Anterior
                    </a>
                </li>
                {pageNumbers.map((pgNumber) => (
                    <li key={pgNumber}>
                        <a
                            href="#"
                            onClick={() => setCurrentPage(pgNumber)}
                            className={`${
                                currentPage === pgNumber
                                    ? "bg-blue-600 text-white"
                                    : "bg-white"
                            } px-2 py-2 font-bold hover:shadow rounded-lg transition-all transform duration-300`}
                        >
                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li>
                    <a
                        href="#"
                        onClick={nextPage}
                        className="bg-white px-2 py-2 font-bold hover:shadow rounded-lg transition-all transform duration-300"
                    >
                        Siguiente
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
