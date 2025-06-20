import { Prayer } from "@/utils/calculatePrayerTimes";

interface PrayerGridProps {
  prayers: Prayer[] | null;
  error: string | null;
}

export function PrayerGrid({ prayers, error }: PrayerGridProps) {
  // if (!prayers || error) {
  //   return (<div className="pb-4 gap-4 mt-4 text-sm"></div>);
  // }

  return (
    <ul className="grid grid-cols-1 pb-4 gap-4 mt-4 text-sm">
      {prayers?.map((prayer) => (
        <li
          key={prayer.name}
          className="flex items-center justify-between bg-gray-800 rounded-xl shadow-lg p-4"
        >
          <span className="font-medium capitalize">{prayer.name}</span>
          <span className="font-mono">{prayer.time}</span>
        </li>
      ))}
    </ul>
  );
}
