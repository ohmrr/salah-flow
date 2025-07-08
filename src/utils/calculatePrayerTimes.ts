import { CalculationMethod, Coordinates, PrayerTimes } from 'adhan';
import moment from 'moment-timezone';

export type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export interface Prayer {
  name: PrayerName;
  time: string;
}

export function calculatePrayerTimes(coordinates: Coordinates): Prayer[] {
  const prayerNames: PrayerName[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha'];
  const params = CalculationMethod.NorthAmerica();

  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const tz = moment.tz.guess();
  const format = 'h:mm A';

  const rawPrayerTimes = new PrayerTimes(coordinates, date, params);
  const prayers = prayerNames.map((prayer) => ({
    name: prayer,
    time: moment.tz(rawPrayerTimes[prayer], tz).format(format),
  }));

  return prayers;
}
