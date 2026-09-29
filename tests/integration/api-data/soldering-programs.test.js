import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { apiDataEndpoints } from "../../../src/apiDataEndpoints.js";
import { integrationEnvironment } from "./environment.js";

const request = async (url) => {
  try {
    return await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    throw new Error(
      `Impossible de joindre l'API Data à l'adresse ${url}. Vérifiez qu'elle est démarrée.`,
      { cause: error }
    );
  }
};

const assertSolderingProgramContract = (program) => {
  assert.equal(typeof program.solderingProgramUid, "string");
  assert.ok(program.solderingProgramUid.length > 0);
  assert.equal(typeof program.productUid, "string");
  assert.ok(program.productUid.length > 0);
  assert.ok(Number.isInteger(program.program));
  assert.equal(typeof program.side, "string");
  assert.ok(program.side.length > 0);
  assert.ok(Number.isFinite(Date.parse(program.startDate)));
  assert.ok(Number.isFinite(Date.parse(program.endDate)));
};

describe("API Data - endpoints utilisés par le client Web", () => {
  test("refuse un UID d'ordre de fabrication invalide", async () => {
    assert.ok(
      integrationEnvironment.apiDataBaseUrl,
      "VITE_API_DATA ou API_DATA_BASE_URL doit être configuré"
    );
    assert.match(
      integrationEnvironment.invalidManufacturingOrderUid,
      /^-?\d+$/,
      "TEST_INVALID_MANUFACTURING_ORDER_UID doit être un entier inférieur ou égal à 0"
    );
    assert.ok(
      Number(integrationEnvironment.invalidManufacturingOrderUid) <= 0,
      "TEST_INVALID_MANUFACTURING_ORDER_UID doit être inférieur ou égal à 0"
    );

    const url =
      apiDataEndpoints.getSolderingProgramByManufacturingOrderUidLatestOne(
        integrationEnvironment.apiDataBaseUrl,
        integrationEnvironment.invalidManufacturingOrderUid
      );
    const response = await request(url);

    assert.equal(response.status, 400);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);
    const problem = await response.json();
    assert.equal(typeof problem.title, "string");
    assert.match(problem.detail, /manufacturingOfUid/);
  });

  test("retourne les programmes actifs d'un OF présent dans la base de test", async () => {
    assert.ok(
      integrationEnvironment.apiDataBaseUrl,
      "VITE_API_DATA ou API_DATA_BASE_URL doit être configuré"
    );
    assert.match(
      integrationEnvironment.manufacturingOrderUid ?? "",
      /^[1-9]\d*$/,
      "Renseignez TEST_MANUFACTURING_ORDER_UID dans .env.integration.local avec un OF de la base de test"
    );

    const url =
      apiDataEndpoints.getSolderingProgramByManufacturingOrderUidLatestOne(
        integrationEnvironment.apiDataBaseUrl,
        integrationEnvironment.manufacturingOrderUid
      );
    const response = await request(url);

    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /application\/json/);

    const programs = await response.json();
    assert.ok(Array.isArray(programs));
    assert.ok(programs.length > 0);
    programs.forEach(assertSolderingProgramContract);
  });
});
