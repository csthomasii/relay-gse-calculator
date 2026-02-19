import "./SelectInput.css";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  name: string;
  options: SelectOption[];
  value: string | null;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SelectInput({
  name,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
}: SelectInputProps) {
  return (
    <div className="select-input">
      <select
        name={name}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className={`select-input__select ${!value ? "select-input__select--placeholder" : ""}`}
        aria-label={name}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="select-input__arrow">&#9662;</span>
    </div>
  );
}
