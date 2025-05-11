export type MoneyOperationType = "expanses" | "income" | "revenue" | "debt";
export type DivisionType = "B2B" | "B2C";

export interface MoneyOperation {
  id: number;
  division: DivisionType;
  date: string;
  amount: string;
  type: MoneyOperationType;
}

export interface MockData {
  data: MoneyOperation[];
}
