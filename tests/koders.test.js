//Este archivo es para realizar las pruebas de nuestra 'db-test'
import { expectTypeOf } from "vitest";
import kodersUseCase from "../src/usecases/koders.usecases";
import { describe, test, it, expect } from "vitest";

describe("Koders use cases", () => {
  it("Should list all koders", async () => {
    // esto nos regresa la lista de koders
    const kodersList = await kodersUseCase.getAll();

    // expect(kodersList).toBeInstanceOf(Array);
    // Esto hace lo mismo
    // expect(kodersList).toBe([]);
    // Esto hace lo mismo pero te dice que tipo de dato es
    expectTypeOf(kodersList).toBeArray();
    // Esperamos que la longitud de 'koderList' sea cero
    // expect(kodersList.length).toBe(0);
    // Esto hace lo mismo que '.length'
    expect(kodersList).toHaveLength(0);
  });

  it("Should register a new koder", async () => {
    const testKoder = {
      firstName: "test",
      lastName: "testing",
      email: "signup@example.com",
      password: "kodemia123",
    };

    const newKoder = await kodersUseCase.signUp(testKoder);

    expectTypeOf(newKoder).toBeObject();
    expect(newKoder.firstName).toBe(testKoder.firstName);
    expect(newKoder.lastName).toBe(testKoder.lastName);
    expect(newKoder.email).toBe(testKoder.email);
    expect(newKoder.password).not.toBe(testKoder.password);
    expect(newKoder._id).toBeDefined();
  });

  it("Should not register a koder without required data and throw error", async () => {
    // aqui esperamos una 'promesa' se rechace
    // porque no debe permitirme registrarme sin la informacion requerida
    expect(kodersUseCase.signUp({})).rejects.toThrowError();
  });

  // aqui validamos si hay 2 'emails' repetidos
  // revisamos que el 'id' no se repita ni los datos
  it("Should not register 2 koders with the same email", async () => {
    // se valida que el 'koder' exista
    const firstKoder = await kodersUseCase.signUp(testKoder);

    // aqui se verifica que ese 'koder' exista
    expect(firstKoder).toBeDefined();
    expectTypeOf(firstKoder).toBeObject();
    expect(firstKoder._id).toBeDefined();

    // si existe un 'koder' con la misma informacion se rechaza
    expect(kodersUseCase.signUp(testKoder)).rejects.toThrowError();
  });
});
