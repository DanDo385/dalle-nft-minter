// components/ui/TextArea.jsx

const Button = ({ children, onClick, disabled }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-green-400 hover:bg-black text-black hover:text-green-400 font-bold py-2 px-4 rounded disabled:opacity-50"
        >
            {children}
        </button>
    );
};

export default Button;
