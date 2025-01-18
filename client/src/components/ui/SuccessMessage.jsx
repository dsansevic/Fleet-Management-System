const SuccessMessage = ({ message }) => {
    return (
        <div className={`my-6 p-4 rounded shadow bg-purple-50 text-brand-dark`}>
            {message}
        </div>
    );
};

export default SuccessMessage;