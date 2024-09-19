import mongoose from "mongoose";
import db from "../src/lib/db";
import { afterAll, beforeAll, beforeEach } from "vitest";
import mongoose from "mongoose";

//Verifica que se esta usando una base de datos 'test'
function checkIsTestDB() {
  const DB_NAME = process.env.DB_NAME;

  console.log(DB_NAME);
  if (!DB_NAME.includes("test")) {
    throw new Error("You are not using a test database");
  }
}

//Conectar a la base de datos antes de correr cualquier test
beforeAll(async () => {
  //Aqui le decimos que antes de correr, primero se conecte a la 'db'
  checkIsTestDB();
  await db.connect();
});

//antes de cada prueba esto limpia nuestra 'db'
beforeEach(async () => {
  //limpiar la base de datos
  //Se ocupa 'mongoose' para hacer este proceso
  checkIsTestDB();
  //   await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
