import { useState, useRef } from "react";
import Number from "./Number";
import Operation from "./Operation";
import Screen from "./Screen";

const Calculator = () => {
  /** TODO: Here is where you are going to keep track of calculator state */
  const [screenValue, setScreenValue] = useState(0);
  const [isAllClear, setIsAllClear] = useState(true);

  const operation = useRef(null);
  const firstFactor = useRef(0);
  const secondFactor = useRef(0);
  const newNumber = useRef(true);

  /** TODO: what happens when I click a number? */
  const handleNumberClick = (number) => {
    setIsAllClear(false);
    setScreenValue(number.toString());
  };

  /** TODO: what happens when I click an operation? */
  const handleOperationClick = (value) => {
    if (operation.current !== null) {
      performPendingOperation();
      if (value === "=") {
        operation.current = null;
      }
      setScreenValue(firstFactor.current.toString()); 
    } else {
      operation.current = value;
      firstFactor.current = parseInt(screenValue);
    }
    operation.current = value;
    newNumber.current = true;
  };

  const getNewScreenValue = (number) => {
    if (newNumber.current) {
      newNumber.current = false;
      return number;
    } else {
      return screenValue + number;
    }
  };

  const clear = () => {
    newNumber.current = true;
    if (isAllClear) {
      operation.current = null;
      firstFactor.current = 0;
      secondFactor.current = 0;
      setScreenValue(firstFactor.current.toString());
    } else {
      secondFactor.current = 0;
      setScreenValue(secondFactor.current.toString());
      setIsAllClear(true);
    }
  };

  const performPendingOperation = () => {
    secondFactor.current = parseInt(screenValue);
    if (operation.current === "+") {
      firstFactor.current += secondFactor.current;
    } else if (operation.current === "/") {
      firstFactor.current /= secondFactor.current;
    } else if (operation.current === "x") {
      firstFactor.current *= secondFactor.current;
    } else if (operation.current === "-") {
      firstFactor.current -= secondFactor.current;
    }
  };

  return (
    <div>
      <Screen value={screenValue} />
      <div style={{ display: "flex" }}>
        <div>
          <Number value={0} onClick={() => handleNumberClick(getNewScreenValue(0))} />
          <Number value={1} onClick={() => handleNumberClick(getNewScreenValue(1))} />
          <Number value={2} onClick={() => handleNumberClick(getNewScreenValue(2))} />
          <Number value={3} onClick={() => handleNumberClick(getNewScreenValue(3))} />
          <Number value={4} onClick={() => handleNumberClick(getNewScreenValue(4))} />
          <Number value={5} onClick={() => handleNumberClick(getNewScreenValue(5))} />
          <Number value={6} onClick={() => handleNumberClick(getNewScreenValue(6))} />
          <Number value={7} onClick={() => handleNumberClick(getNewScreenValue(7))} />
          <Number value={8} onClick={() => handleNumberClick(getNewScreenValue(8))} />
          <Number value={9} onClick={() => handleNumberClick(getNewScreenValue(9))} />
        </div>
        <div style={{ paddingLeft: 10 }}>
          <Operation value="+" onClick={() => handleOperationClick("+")} />
          <Operation value="/" onClick={() => handleOperationClick("/")} />
          <Operation value="x" onClick={() => handleOperationClick("x")} />
          <Operation value="-" onClick={() => handleOperationClick("-")} />
          <Operation value="=" onClick={() => handleOperationClick("=")} />
          <Operation value={isAllClear ? "AC" : "C"} onClick={() => clear(isAllClear)} />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
