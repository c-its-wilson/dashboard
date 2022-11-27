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
      // in m/s, convert to km/h
      // return (Number(value) * 60 * 60 / 1000).toFixed(2);
      // in m/s, convert to mins/km
      return (1 / ((Number(value) * 60) / 1000)).toFixed(2);
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
