export default function PlatformInput({
  icon,
  label,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow-md p-4 w-full border border-gray-300 focus-within:border-primary transition">
      <div className="text-2xl text-gray-600">{icon}</div>
      <input
        type="text"
        placeholder={label}
        className="flex-grow p-2 text-lg border-none focus:outline-none text-gray-800 placeholder-gray-500"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
