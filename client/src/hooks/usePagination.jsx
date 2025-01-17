import { useState, useEffect } from "react";

const usePagination = (fetchFunction, storageKey, itemsPerPage = 5) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(
        parseInt(sessionStorage.getItem(storageKey)) || 1
    );

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const result = await fetchFunction(currentPage, itemsPerPage);
                setData(result.data);
                setTotalPages(result.totalPages);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        sessionStorage.setItem(storageKey, pageNumber);
    };

    return { data, error, loading, totalPages, currentPage, handlePageChange };
};

export default usePagination;