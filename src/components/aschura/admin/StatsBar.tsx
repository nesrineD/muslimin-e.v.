import type { CapacityInfo } from "@/types/ashura";

interface Props {
  capacity: CapacityInfo;
  checkedIn: number;
}

export function StatsBar({ capacity, checkedIn }: Props) {
  const stats = [
    { label: "Gesamtteilnehmerinnen", value: capacity.registered },
    { label: "Eingecheckt", value: checkedIn },
    { label: "Noch verfügbar", value: capacity.available },
    { label: "Kapazität", value: capacity.total_capacity },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-xl bg-cream-50 border border-sage-200 p-4 text-center"
        >
          <p className="text-2xl font-bold text-charcoal-800">{stat.value}</p>
          <p className="text-xs text-charcoal-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
