import { forwardRef, SelectHTMLAttributes, useState } from "react"
import { twMerge } from "tailwind-merge";
import CreatableSelect from "react-select/creatable";

import uniqid from "uniqid"


interface SelectCreateProps extends React.SelectHTMLAttributes<HTMLSelectElement> {

}

interface Option {
    readonly label: string;
    readonly value: string;
}

const createOption = (label:string, id:string) => ({
    label,
    value: id,
});

const defaultOptions = [
    createOption('Excuse Me', '456908'),
    createOption('Undignified', '0648509'),
    createOption('Heal Me', '598676'),
    createOption('Wretched Soul', '6589469'),
]

//Tailwind Styles
const customSelectStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        display: "flex",
        width: "100%",
        borderRadius: "0.375rem", // corresponds to rounded-md
        backgroundColor: "#3f3f46", // corresponds to bg-neutral-700
        border: "0px solid transparent", // border-transparent
        padding: "0.5rem", // corresponds to py-3 px-3
        fontSize: "0.875rem", // corresponds to text-sm
        color: state.isDisabled ? "#9ca3af" : "#a3a3a3", // corresponds to text-neutral-400, disabled state opacity
        outline: state.isFocused ? "none" : undefined,
        boxShadow: state.isFocused ? "0 0 0 0px #818cf8" : "none", // Optional: focus ring color (e.g., focus outline)
    }),
    menu: (provided: any) => ({
        ...provided,
        backgroundColor: "#3f3f46",
    }),
    input: (provided: any) => ({
        ...provided,
        color: "#a3a3a3", // corresponds to text-neutral-400
    }),
    placeholder: (provided: any) => ({
        ...provided,
        color: "#9ca3af", // slightly lighter text for the placeholder
    }),
    singleValue: (provided: any) => ({
        ...provided,
        color: "#a3a3a3", // corresponds to text-neutral-400
    }),
    dropdownIndicator: (provided: any, state: any) => ({
        ...provided,
        color: state.isFocused ? "#818cf8" : "#a3a3a3", // Customize dropdown arrow color
    }),
    option: (provided: any, state: any) => ({
        ...provided,
        backgroundColor: state.isFocused ? "#4b5563" : "#3f3f46", // Option hover and background colors
        color: state.isSelected ? "#ffffff" : "#a3a3a3", // Selected option color
        padding: "0.75rem", // Add padding for options
    }),
    multiValue: (provided: any) => ({
        ...provided,
        backgroundColor: "#4b5563", // Multi-value chip background
        color: "#ffffff", // Text color for multi-value
    }),
    multiValueLabel: (provided: any) => ({
        ...provided,
        color: "#ffffff", // Text color for multi-value label
    }),
    multiValueRemove: (provided: any) => ({
        ...provided,
        color: "#ffffff",
        ':hover': {
            backgroundColor: "#f87171", // Hover effect on remove button
            color: "#ffffff",
        },
    }),
};


const SelectCreate = forwardRef<HTMLSelectElement, SelectCreateProps>(({className, disabled, ...props}, ref ) => {
    const [isLoading, setIsLoading] = useState(false)
    const [options, setOptions] = useState(defaultOptions);
    const [value, setValue] = useState<Option | null>();
    const albumID = uniqid().replace(/\D/g, '');

    const handleCreate = (inputValue:string) => {
        setIsLoading(true);
        setTimeout(() => {
            const newOption = createOption(inputValue, albumID);
            setIsLoading(false);
            setOptions((prev) => [...prev, newOption])
            setValue(newOption);
        }, 1000)
    }
    
    return (
        <CreatableSelect
            isDisabled={disabled}
            isLoading={isLoading}
            onChange={(newValue) => setValue(newValue)}
            onCreateOption={handleCreate}
            options={options}
            value={value}
            styles={customSelectStyles}
            placeholder="Create / Select Album"
        />
    );
});

SelectCreate.displayName = "SelectCreate"

export default SelectCreate;