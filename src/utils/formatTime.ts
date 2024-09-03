export const formatTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  let seconds: string | number = duration - minutes * 60;
  if (seconds < 10) {
    seconds = `${seconds}0`;
  }
  return `${minutes}:${seconds}`;
};
