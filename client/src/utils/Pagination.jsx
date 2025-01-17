const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    if (totalPages <= 1) return null; 
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center space-x-2 mt-6">
            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`px-3 py-1 rounded-md ${currentPage === number ? 'bg-brand-dark text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;