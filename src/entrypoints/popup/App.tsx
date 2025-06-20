import { Footer } from "@/components/Footer";
import { calculatePrayerTimes, Prayer } from "@/utils/calculatePrayerTimes";
import { Coordinates } from "adhan";
import { PrayerGrid } from "@/components/PrayerGrid";
import moment from "moment-timezone";
import { useEffect, useState } from "react";
import "./App.css";

export function App() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<Prayer[] | null>(null);
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

        <PrayerGrid prayers={prayerTimes} error={error} />
        <Footer />
      </div>
    </>
  );
}
