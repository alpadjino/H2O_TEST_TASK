import { faker } from "@faker-js/faker";
import { MockData, MoneyOperationType, DivisionType, MoneyOperation } from "./models";

const divisions: DivisionType[] = ["B2B", "B2C"];
const types: MoneyOperationType[] = ["expanses", "income", "revenue", "debt"];

function generateMockData(count: number = 100): MockData {
  const data = Array.from(
    { length: count },
    (_, i): MoneyOperation => ({
      id: i + 1,
      division: faker.helpers.arrayElement(divisions),
      date: faker.date
        .between({ from: "2025-01-01", to: "2025-05-10" })
        .toISOString(),
      amount: faker.number.int({ min: 1000, max: 500000 }).toString(),
      type: faker.helpers.arrayElement(types),
    })
  );

  return { data };
}

export const db = generateMockData(100);
