  const SubmitButton = ({ readyToSend, className = "", type="submit", children, 
      ...props 
    }) => {
      return (
        <button
          type={type}
          className={`w-fit py-2 px-5 mt-2 border-b shadow text-gray-500 rounded-2xl ${readyToSend ? "bg-gray-100 cursor-default" : "bg-brand-base hover:bg-brand-lighter text-white outline-1 outline-brand-light"} ${className}`}
          {...props}
          disabled = {readyToSend}
        >
          {children}
        </button>
      );
    };
    
  export default SubmitButton; 