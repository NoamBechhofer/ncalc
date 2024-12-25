import { Display, Operation, Operator } from "@/types";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

const DEFAULT_DISPLAY: Display = {
  before_decimal: "0",
  after_decimal: "",
  state: "before decimal",
};

export default function useCalculator() {
  const [operation, setOperation] = useState<Operation>("none");
  const [display, setDisplay] = useState<Display>(DEFAULT_DISPLAY);

  const resetDisplay = useCallback(() => {
    setDisplay(DEFAULT_DISPLAY);
    setOperation("none");
  }, [setDisplay]);

  const pushOperator = useCallback(
    (operator: Operator) => {
      if (
        operator === Operator.SUBTRACT &&
        _.isEqual(display, DEFAULT_DISPLAY)
      ) {
        setDisplay({
          before_decimal: "-",
          after_decimal: "",
          state: "before decimal",
        });
        return;
      }

      if (operation !== "none") {
        alert("You've already entered an operator");
        return;
      }

      const operand = parseFloat(
        display.before_decimal + "." + display.after_decimal
      );

      if (isNaN(operand)) {
        alert("Invalid operand");
        return;
      }

      setOperation({ operator, operand });
      setDisplay(DEFAULT_DISPLAY);
    },
    [display, operation, setDisplay, setOperation]
  );

  const appendDigit = useCallback(
    (digit: number) => {
      if (digit > 9 || digit < 0) {
        throw new Error(`Invalid digit ${digit} - must be 0-9`);
      }

      if (display.state === "after decimal") {
        setDisplay({
          before_decimal: display.before_decimal,
          after_decimal: display.after_decimal + digit.toString(),
          state: display.state,
        });
      } else if (display.state === "display only") {
        setDisplay({
          before_decimal: digit.toString(),
          after_decimal: "",
          state: "before decimal",
        });
      } else if (display.before_decimal === "0") {
        setDisplay({
          before_decimal: digit.toString(),
          after_decimal: display.after_decimal,
          state: display.state,
        });
      } else {
        setDisplay({
          before_decimal: display.before_decimal + digit.toString(),
          after_decimal: display.after_decimal,
          state: display.state,
        });
      }
    },
    [display, setDisplay]
  );

  const handleDecimal = useCallback(() => {
    if (display.state === "after decimal") {
      return;
    }

    if (display.state === "display only") {
      setDisplay({
        before_decimal: "0",
        after_decimal: "",
        state: "after decimal",
      });
      return;
    }

    setDisplay({
      before_decimal: display.before_decimal,
      after_decimal: display.after_decimal,
      state: "after decimal",
    });
  }, [display, setDisplay]);

  const handleEqual = useCallback(() => {
    if (operation === "none") {
      return;
    }

    const operand = parseFloat(
      display.before_decimal + "." + display.after_decimal
    );

    if (isNaN(operand)) {
      alert("Invalid operand");
      return;
    }

    let result: number;

    switch (operation.operator) {
      case Operator.ADD:
        result = operation.operand + operand;
        break;
      case Operator.SUBTRACT:
        result = operation.operand - operand;
        break;
      case Operator.MULTIPLY:
        result = operation.operand * operand;
        break;
      case Operator.DIVIDE:
        if (operand === 0) {
          alert("Division by zero is undefined");
          return;
        }

        result = operation.operand / operand;
        break;
    }

    const decimals = result % 1;
    setOperation("none");
    setDisplay({
      before_decimal: Math.trunc(result).toString(),
      after_decimal: decimals
        .toString()
        .slice(Math.sign(decimals) === -1 ? 3 : 2),
      state: "display only",
    });
  }, [display.after_decimal, display.before_decimal, operation]);

  useEffect(() => {
    const keyboardEntryHandler = (e: KeyboardEvent) => {
      if (!isNaN(parseInt(e.key))) {
        appendDigit(parseInt(e.key));
        return;
      }

      switch (e.key) {
        case "+":
          pushOperator(Operator.ADD);
          break;
        case "-":
          pushOperator(Operator.SUBTRACT);
          break;
        case "*":
          pushOperator(Operator.MULTIPLY);
          break;
        case "/":
          pushOperator(Operator.DIVIDE);
          break;
        case ".":
        case ",":
          handleDecimal();
          break;
        case "Enter":
          handleEqual();
          break;
        case "Escape":
          resetDisplay();
          break;
      }
    };
    window.addEventListener("keydown", keyboardEntryHandler);
    return () => window.removeEventListener("keydown", keyboardEntryHandler);
  }, [handleDecimal, handleEqual, appendDigit, resetDisplay, pushOperator]);

  return {
    display,
    resetDisplay,
    pushOperator,
    appendDigit,
    handleDecimal,
    handleEqual,
  };
}
