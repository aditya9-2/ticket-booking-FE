interface Iinput {
    type: string;
    placeholder: string;
    onChange?: () => void;
    onClick?: () => void;
    className: string;
}

const CustomInput = ({ className, type, placeholder, onChange, onClick }: Iinput) => {
    return (
        <div>
            <input className={className} type={type} placeholder={placeholder} onChange={onChange} onClick={onClick} />
        </div>
    )
}

export default CustomInput