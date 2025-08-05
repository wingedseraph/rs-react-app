type InputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function Input({ value, onChange }: InputProps) {
  return (
    <input
      className="outline-0"
      type="text"
      value={value}
      onChange={(event_) => onChange(event_.target.value)}
      placeholder="type to search..."
    />
  );
}
