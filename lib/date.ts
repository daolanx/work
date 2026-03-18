import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";

export function getRelativeTimeString(dateValue: string | Date) {
	const date = new Date(dateValue);

	if (isToday(date)) return "Today";
	if (isYesterday(date)) return "Yesterday";

	// Returns strings like "3 days ago", "2 weeks ago", etc.
	return formatDistanceToNow(date, { addSuffix: true });
}
