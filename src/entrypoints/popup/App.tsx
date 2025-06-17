import { getPrayerTimes } from "#imports";
import { Coordinates } from "adhan";
import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Missing access to geolocation services.");
    }

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const coordinates = new Coordinates(latitude, longitude);
      setLocation(coordinates);
    });
  }, []);

  useEffect(() => {
    if (location) {
      setPrayerTimes(getPrayerTimes(location));
    }
  }, [location]);

  return (
    <>
      <h1>SalahFlow</h1>

      {prayerTimes && prayerTimes.map((time) => <p>{time}</p>)}
    </>
  );
}
