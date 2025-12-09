interface InputEditProps {
    label:string;
    name:string;
    value:string | number;
    type?:string;
    icon:string;
    onChange:(e:React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputEdit({label,name,value,type="text",icon, onChange}:InputEditProps) {
    return (
        <div className="bg-white p-4 rounded-xl drop-shadow-md flex flex-col">
            <h3 className="text-sm font-bold flex items-center gap-2">
                <i className={`fa-solid ${icon}`}></i> {label}
            </h3>
            <input
                type={type}
                name={name}
                className="border rounded-md p-1 mt-1"
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
