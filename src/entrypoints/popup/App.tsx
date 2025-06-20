import { Footer } from "@/components/Footer";
import { calculatePrayerTimes, Prayers } from "@/utils/calculatePrayerTimes";
import { Coordinates } from "adhan";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<Prayers[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Missing access to geolocation services.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordinates = new Coordinates(latitude, longitude);
        setLocation(coordinates);
      },
      () => {
        setError(
          "Unable to retrieve your location. Please allow location access."
        );
      }
    );
  }, []);

  useEffect(() => {
    if (location) {
      const times = calculatePrayerTimes(location);
      setPrayerTimes(times);
    }
  }, [location]);

  return (
    <>
      <div className="py-3">
        <div className="flex flex-col items-center pb-2">
          <h1 className="text-4xl font-extrabold tracking-tight">
            SalahFlow 🕌
          </h1>

          <div className="mt-2 text-sm text-gray-300">
            <p>{moment(new Date()).format("dddd, MMMM Do YYYY")}</p>
          </div>
        </div>

        <ul className="grid grid-cols-1 pb-4 gap-4 mt-4 text-sm">
          {prayerTimes?.map((prayer) => (
            <li
              key={prayer.name}
              className="flex items-center justify-between bg-gray-800 rounded-xl shadow-xl p-4"
            >
              <span className="font-medium capitalize">{prayer.name}</span>
              <span className="font-mono">{prayer.time}</span>
            </li>
          ))}
        </ul>

        <Footer />
      </div>
    </>
  );
}
