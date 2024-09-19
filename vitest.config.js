/// <reference types="vitest" />

import { defineConfig } from "vite";
import { config } from "dotenv";

export default defineConfig({
  //aqui pondremos nuestra configuración
  env: {
    //esto regresa un objeto
    //nos regresa lo que hay en el archivo '.env' como un objeto
    ...config({ path: ".env.test" }).parsed,
  },
  //Esto va luego de configurar el 'archivo setup.js'
  test: {
    setupFiles: ["./tests/setup.js"],
  },
});
//despues de esto hacemos nuestra carpeta 'tests' con el archivo 'setup.js'
