export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: string) {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
