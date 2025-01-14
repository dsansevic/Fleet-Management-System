const SuccessMessage = ({ message }) => {
    return (
        <div className={`my-6 p-4 rounded shadow bg-blue-100 text-blue-800`}>
            {message}
        </div>
    );
};

export default SuccessMessage;