// 🟢 Reusable Platform Input Component
export default function PlatformInput({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
      <div className="flex items-center bg-white rounded-lg shadow-md p-3 w-full">
        {icon}
        <input
          type="text"
          placeholder={label}
          className="flex-grow p-2 text-lg border-none focus:outline-none ml-2"
          value={value}
          onChange={onChange}
        />
      </div>
    );
  }