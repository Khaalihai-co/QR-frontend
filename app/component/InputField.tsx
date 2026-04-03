type Props = {
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
  name,
  placeholder,
  value,
  onChange,
}: Props) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 rounded-lg bg-white/10 text-white 
placeholder-gray-400 border border-white/20 
focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
    />
  );
}