export default function StatCard({ title, value, icon, bgColor }: { title: string; value: string; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className={`shadow-lg p-6 rounded-lg ${bgColor} text-white transform transition-all hover:scale-105 flex flex-col items-center`}>
      <div className="text-4xl mb-2">{icon}</div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-4xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}
