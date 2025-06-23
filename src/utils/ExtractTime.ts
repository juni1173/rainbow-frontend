export function extractTime(datetime: string): string {
  const timePart = datetime.split(" ")[1]; // "07:23:40.356567"
  return timePart.split(".")[0]; // "07:23:40"
}
