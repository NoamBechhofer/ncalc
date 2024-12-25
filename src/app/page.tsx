"use client";

import Button from "@/components/Button";
import useCalculator from "@/hooks/useCalculator";
import { Operator } from "@/types";

export default function Home() {
  const {
    display,
    resetDisplay,
    pushOperator,
    appendDigit,
    handleDecimal,
    handleEqual,
  } = useCalculator();

  return (
    <>
      <div className="grid grid-cols-4 grid-rows-5 gap-1 place-self-center place-items-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[90lvw] h-[90lvh] ">
        <div className={`col-span-3 border border-gray-700 rounded w-[98.75%] h-[95%] flex items-center justify-left p-4 overflow-auto`}>
          {display.before_decimal}
          {display.after_decimal === "" && display.state !== "after decimal"
            ? ""
            : "." + display.after_decimal}
        </div>
        <Button label="C" click_action={resetDisplay} />

        <Button label="7" click_action={() => appendDigit(7)} />
        <Button label="8" click_action={() => appendDigit(8)} />
        <Button label="9" click_action={() => appendDigit(9)} />
        <Button
          label={Operator.DIVIDE}
          click_action={() => pushOperator(Operator.DIVIDE)}
        />

        <Button label="4" click_action={() => appendDigit(4)} />
        <Button label="5" click_action={() => appendDigit(5)} />
        <Button label="6" click_action={() => appendDigit(6)} />
        <Button
          label={Operator.MULTIPLY}
          click_action={() => pushOperator(Operator.MULTIPLY)}
        />

        <Button label="1" click_action={() => appendDigit(1)} />
        <Button label="2" click_action={() => appendDigit(2)} />
        <Button label="3" click_action={() => appendDigit(3)} />
        <Button
          label={Operator.SUBTRACT}
          click_action={() => pushOperator(Operator.SUBTRACT)}
        />

        <Button label="0" click_action={() => appendDigit(0)} />
        <Button label="." click_action={handleDecimal} />
        <Button label="=" click_action={handleEqual} />
        <Button
          label={Operator.ADD}
          click_action={() => pushOperator(Operator.ADD)}
        />
      </div>
    </>
  );
}
