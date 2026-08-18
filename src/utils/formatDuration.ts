import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export const formatDuration = (iso: string) => {
  const time = dayjs.duration(iso);

  if (time.hours() > 0) {
    return time.format("H:mm:ss");
  }

  return time.format("m:ss");
};
