import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const shortRelativeTime = (date: string) => {
  const text = dayjs(date).fromNow(true);

  return text
    .replace("a few seconds", "1s")
    .replace("seconds", "s")
    .replace("a minute", "1m")
    .replace("minutes", "m")
    .replace("an hour", "1h")
    .replace("hours", "h")
    .replace("a day", "1d")
    .replace("days", "d")
    .replace("a month", "1mo")
    .replace("months", "mo")
    .replace("a year", "1y")
    .replace("years", "y");
};