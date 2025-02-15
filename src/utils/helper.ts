export function formatDate(dateStr: Date | null) {
  if (dateStr != undefined) {
    return `${dateStr.toLocaleString("default", { month: "short" })} ${dateStr.getDate()} ${dateStr.getFullYear()}`;
  }
}
