// 🟢 Reusable Stat Card Component
export default function StatCard({ title, value, bgColor }: { title: string; value: string | number; bgColor: string }) {
    return (
      <div className={`shadow-lg p-6 rounded-lg ${bgColor} text-white`}>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    );
  }