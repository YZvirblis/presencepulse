export default function PlatformInput({
  icon,
  label,
  value,
  onChange,
  error,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}) {
  return (
    <div className="w-full">
      <div
        className={`flex items-center gap-3 rounded-lg shadow-md p-4 border transition ${
          error
            ? "bg-red-50 border-red-400"
            : "bg-white border-gray-300 focus-within:border-primary"
        }`}
      >
        <div className={`text-2xl ${error ? "text-red-500" : "text-gray-600"}`}>
          {icon}
        </div>
        <input
          type="text"
          placeholder={label}
          className="flex-grow p-2 text-lg border-none focus:outline-none text-gray-800 placeholder-gray-500 bg-transparent"
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
    </div>
  );
}
