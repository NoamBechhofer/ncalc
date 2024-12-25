export enum Operator {
  ADD = "+",
  SUBTRACT = "−",
  MULTIPLY = "×",
  DIVIDE = "÷",
}

export type Operation = { operator: Operator; operand: number } | "none";

export type Display = {
  before_decimal: string;
  after_decimal: string;
  state: "before decimal" | "after decimal" | "display only";
};
