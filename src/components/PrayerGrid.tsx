import { Prayer } from '@/utils/calculatePrayerTimes';
import { BiSolidBellOff, BiSolidBellRing } from 'react-icons/bi';

interface PrayerGridProps {
  prayers: Prayer[] | null;
  error: string | null;
}

export function PrayerGrid({ prayers, error }: PrayerGridProps) {
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = async (prayer: Prayer) => {  };

  if (!prayers || error) {
    return <div className='pb-4 gap-4 mt-4 text-sm'>{error}</div>;
  }

  return (
    <ul className='grid grid-cols-1 pb-4 gap-4 mt-4 text-sm'>
      {prayers.map((prayer) => (
        <li
          key={prayer.name}
          className='flex items-center justify-between bg-gray-800 rounded-xl shadow-lg p-4'>
          <div className='flex flex-row items-center gap-x-2'>
            {reminders[prayer.name] ? (
              <BiSolidBellRing
                size={16}
                onClick={() => toggleReminder(prayer)}
                className='cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-150'
              />
            ) : (
              <BiSolidBellOff
                size={16}
                onClick={() => toggleReminder(prayer)}
                className='cursor-pointer hover:text-gray-400 transition-all ease-in-out duration-150'
              />
            )}
            <span className='font-medium capitalize'>{prayer.name}</span>
          </div>
          <span className='font-mono'>{prayer.time}</span>
        </li>
      ))}
    </ul>
  );
}
