//components/ui/Button.jsx

const Button = ({ children, onClick, disabled, className }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center bg-green-400 hover:bg-black text-black hover:text-green-400 font-bold py-2 px-4 rounded disabled:opacity-50 ${className}`} // Make sure to apply the className prop here
        >
            {children}
        </button>
    );
};

export default Button;