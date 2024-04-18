// components/ui/TextArea.jsx

const TextArea = ({ value, onChange, placeholder, disabled }) => {
    return (
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className="bg-gray-700 text-green-400 border-green-400 border p-2 w-full rounded"
        />
    );
};

export default TextArea;
