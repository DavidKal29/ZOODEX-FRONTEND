interface SelectEditProps {
    label:string;
    name:string;
    value:string | number;
    options:{id:number; name:string }[];
    icon:string;
    onChange:(e:React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectEdit({label,name,value,options,icon,onChange}:SelectEditProps) {
    return (
        <div className="bg-white p-4 rounded-xl drop-shadow-md flex flex-col">
            <h3 className="text-sm font-bold flex items-center gap-2">
                <i className={`fa-solid ${icon}`}></i> {label}
            </h3>

            <select
                className="border rounded-md p-1 mt-1"
                name={name}
                value={value}
                onChange={onChange}
            >
                {options?.map((o) => (
                    <option key={o.id} value={o.id}>
                        {o.name}
                    </option>
                ))}
            </select>

        </div>
    );
}
