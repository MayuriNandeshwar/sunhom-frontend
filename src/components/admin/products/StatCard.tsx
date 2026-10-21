type Tone = "neutral" | "success" | "warning" | "danger";

const toneStyles: Record<Tone, string> = {
  neutral: "text-gray-900",
  success: "text-green-600",
  warning: "text-amber-500",
  danger: "text-red-500",
};

type Props = {
  label: string;
  value: number;
  tone?: Tone;
};

export default function StatCard({
  label,
  value,
  tone = "neutral",
}: Props) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white px-6 py-5 shadow-sm">
      <div className={`text-3xl font-semibold ${toneStyles[tone]}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-gray-500">{label}</div>
    </div>
  );
}
