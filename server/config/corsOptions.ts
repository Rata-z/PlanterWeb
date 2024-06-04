//after developement remove localhost and || !origin
const whitelist = ["http://localhost:3000"];
export const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Access not allowed"));
    }
  },
  optionsSuccessStatus: 200,
};
