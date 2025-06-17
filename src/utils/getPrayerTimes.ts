import { CalculationMethod, Coordinates, PrayerTimes } from "adhan";
import moment from "moment-timezone";

export type Prayers =  'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha';

export default function calculatePrayerTimes(coordinates: Coordinates) {
  const prayerNames: Prayers[] = ['fajr', 'dhuhr', 'asr', 'maghrib', 'isha']
  const params = CalculationMethod.NorthAmerica();

  const today = new Date();
  const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
  const tz = moment.tz.guess();
  const format = 'h:mm A'

  const rawPrayerTimes = new PrayerTimes(coordinates, date, params);
  const prayerTimes = prayerNames.map(prayer => moment.tz(rawPrayerTimes[prayer], tz).format(format));

  return prayerTimes;
}
