import { useEffect, useState } from 'react';
import { Cloud, CloudRain, Sun, Wind } from 'lucide-react';

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  provider: string;
  keyExposed: boolean;
}

function WeatherIcon({ description }: { description: string }) {
  const d = description.toLowerCase();
  if (d.includes('rain') || d.includes('drizzle')) return <CloudRain size={20} />;
  if (d.includes('cloud')) return <Cloud size={20} />;
  return <Sun size={20} />;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/weather')
      .then((r) => {
        if (!r.ok) throw new Error('Weather unavailable');
        return r.json();
      })
      .then(setWeather)
      .catch(() => setError('Weather data unavailable'));
  }, []);

  if (error) {
    return (
      <div className="weatherWidget weatherError">
        <Cloud size={18} />
        <span>{error}</span>
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="weatherWidget weatherLoading">
        <Cloud size={18} />
        <span>Loading weather…</span>
      </div>
    );
  }

  return (
    <div className="weatherWidget" aria-label={`Weather in ${weather.city}`}>
      <WeatherIcon description={weather.description} />
      <div className="weatherInfo">
        <span className="weatherTemp">{Math.round(weather.temperature)}°C</span>
        <span className="weatherCity">{weather.city}</span>
      </div>
      <div className="weatherMeta">
        <Wind size={14} />
        <span>{weather.windSpeed} m/s</span>
        <span>·</span>
        <span>{weather.humidity}% RH</span>
      </div>
    </div>
  );
}
