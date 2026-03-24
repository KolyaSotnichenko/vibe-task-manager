export function getCityBackground(timezone: string): string | undefined {
  if (!timezone) return undefined;

  // Extract city-like token from timezone or free text input
  // Examples: "Europe/London" -> "London", "America/New_York" -> "New York"
  const raw = timezone.split('/').pop() ?? timezone;
  const city = raw.replace(/_/g, ' ').trim();
  if (!city) return undefined;

  // Public Unsplash endpoint: no API key, returns a relevant city photo
  return `https://source.unsplash.com/1600x900/?${encodeURIComponent(city)}`;
}
