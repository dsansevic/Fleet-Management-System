const SubmitButton = ({ isDisabled, readyToSend, className = "", children, 
    ...props 
  }) => {
    return (
      <button
        type="submit"
        className={`w-fit py-2 px-5 mt-2 border-l-2 border-b border-brand-dark text-white rounded-3xl ${readyToSend ? "bg-gray-400 cursor-default" : "bg-brand-base hover:bg-brand-light"} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
export default SubmitButton;  