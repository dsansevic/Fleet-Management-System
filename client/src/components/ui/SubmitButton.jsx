  const SubmitButton = ({ readyToSend, className = "", type="submit", children, 
      ...props 
    }) => {
      return (
        <button
          type={type}
          className={`w-fit py-2 px-5 mt-2 border-l-2 border-b border-brand-dark text-white rounded-md ${readyToSend ? "bg-gray-400 cursor-default" : "bg-brand-dark hover:bg-brand-lighter"} ${className}`}
          {...props}
        >
          {children}
        </button>
      );
    };
    
  export default SubmitButton; 