export const convertMetric = (param: string, value: any) => {
  try {
    if (param.includes("time") && typeof value == "number") {
      // Strava saves time in seconds, convert to readable format
      const mins = Math.floor(value / 60);
      const secs = value % 60;
      return `${padTo2Digits(mins)}:${padTo2Digits(secs)}`;
    } else if (param == "distance") {
      // converts meters to KM
      return (Number(value) / 1000).toFixed(2);
    } else if (param.includes("speed")) {
      // in m/s, convert to mins/km
      const s_km = 1000 / value;
      const mins = Math.floor(s_km / 60);
      const secs = s_km % 60;
      return `${padTo2Digits(mins)}:${padTo2Digits(secs).substring(0, 2)}`;
    } else {
      throw new Error(
        `Error, unable to convert param ${param} with the value of ${value}`
      );
    }
  } catch (e) {
    throw new Error(
      `Error, unable to convert param ${param} with the value of ${value}`
    );
  }
};

const padTo2Digits = (num: number) => {
  return num.toString().padStart(2, "0");
};
