//props componente InputField
interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

import './Input.css'

//componente campos de entrada 
function InputField({ label, type, value, onChange, placeholder }: InputProps) {
    return (
        <div className="input-field">
            <label>{label}</label>
            <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}

//exportar componente
export default InputField;