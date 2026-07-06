import type { CapacityInfo } from "@/types/aschura";

interface Props {
  capacity: CapacityInfo;
  checkedIn: number;
}

export function StatsBar({ capacity, checkedIn }: Props) {
  const isFull = capacity.available === 0;

  const stats = [
    {
      label: "Gesamtgäste",
      value: capacity.registered,
      card: "bg-charcoal-800 border-charcoal-700",
      value_class: "text-cream-50",
      label_class: "text-charcoal-300",
    },
    {
      label: "Eingecheckt",
      value: checkedIn,
      card: "bg-sage-600 border-sage-700",
      value_class: "text-white",
      label_class: "text-sage-100",
    },
    {
      label: "Noch verfügbar",
      value: capacity.available,
      card: isFull
        ? "bg-clay-600 border-clay-700"
        : "bg-clay-50 border-clay-200",
      value_class: isFull ? "text-cream-50" : "text-clay-800",
      label_class: isFull ? "text-clay-100" : "text-clay-600",
    },
    {
      label: "Kapazität",
      value: capacity.total_capacity,
      card: "bg-sand-100 border-sand-300",
      value_class: "text-charcoal-800",
      label_class: "text-charcoal-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`rounded-xl border p-3 sm:p-5 text-center ${stat.card}`}
        >
          <p className={`text-2xl sm:text-3xl font-bold tabular-nums ${stat.value_class}`}>
            {stat.value}
          </p>
          <p className={`text-xs font-medium mt-1 sm:mt-1.5 ${stat.label_class}`}>
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
