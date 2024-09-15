import * as dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

export const dataBase : Sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.MYSQL_USER as string,
  process.env.MYSQL_PASS as string,
  {
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging : false,
    timezone : process.env.TIME_ZONE
  }
);
export const connectToDB = async () => {
  try {
    await dataBase.authenticate();
    console.log("Server Connected To MySQL Successfully");
  } catch (err) {
    if (err instanceof Error) {
      console.log("Server Faild To Connect MySQL");
    }
  }
};
