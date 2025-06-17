import { Coordinates } from "adhan";

export default function LocationButton() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [prayerTimes, setPrayerTimes] = useState<string[] | null>(null);

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError("Your browser does not support geolocation.");
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordinates = new Coordinates(latitude, longitude);
        setLocation(coordinates);
      },
      (err) => {
        setError("Failed to determine coordinates: " + err.message);
      }
    );
  };

  return (
    <div>
      <button onClick={handleGetLocation}>Click to Get Location</button>

      {location && (
        <div>
          <p>latitude: {location.latitude}</p>
          <p>longitude: {location.longitude}</p>
        </div>
      )}
    </div>
  );
}
