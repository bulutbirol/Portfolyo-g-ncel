// sendBeacon survives the page unloading, so it also works for the download click.
export function track(e) {
  if (import.meta.env.DEV || !navigator.sendBeacon) return;
  navigator.sendBeacon("/api/track.php", JSON.stringify({ e }));
}
