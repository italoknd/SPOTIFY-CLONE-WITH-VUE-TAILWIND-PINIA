export const loadedmetadata = (audio: HTMLAudioElement): string => {
  let total_track_time: string = "";

  audio.addEventListener("loadedmetadata", () => {
    const duration = audio.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration - minutes * 60);

    total_track_time = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });

  return total_track_time;
};
