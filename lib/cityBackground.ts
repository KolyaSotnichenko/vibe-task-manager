export function getCityBackground(timezone: string): string | undefined {
  const value = timezone.toLowerCase();

  if (value.includes('london')) {
    return 'https://images.unsplash.com/photo-1469474968028-56623f02e42e';
  }

  return undefined;
}
