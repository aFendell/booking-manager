export function generateTimeSlots(
  date: string,
  startTime = '09:00',
  endTime = '17:00',
): string[] {
  const timeSlots: string[] = [];
  const startDate = new Date(`${date}T${startTime}`);
  const endDate = new Date(`${date}T${endTime}`);

  const currentTime = new Date(startDate);

  while (currentTime <= endDate) {
    const formattedTime = currentTime.toTimeString().slice(0, 5);
    timeSlots.push(formattedTime);
    currentTime.setMinutes(currentTime.getMinutes() + 30);
  }

  return timeSlots;
}
