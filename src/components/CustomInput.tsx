import type { ReactNode } from "react";

interface Iinput {
    type: string;
    placeholder: string;
    label?: string; 
    icon?: ReactNode; 
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onClick?: () => void;
    className?: string;
}

const CustomInput = ({ className, type, placeholder, label, icon, onChange, onClick }: Iinput) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && <label className="text-sm font-semibold text-gray-900">{label}</label>}
            
            <div className={`
                flex items-center gap-2 px-3 py-2.5
                border border-gray-300 rounded-xl shadow-sm
                transition-all duration-200 bg-white
                ${className}
            `}>
                {/* Icon Slot */}
                {icon && <div className="text-gray-400">{icon}</div>}
                
                <input 
                    className="w-full bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-sm" 
                    type={type} 
                    placeholder={placeholder} 
                    onChange={onChange} 
                    onClick={onClick} 
                />
            </div>
        </div>
    )
}

export default CustomInput;