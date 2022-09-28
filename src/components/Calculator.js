import { useState, useRef } from "react";
import "./Calculator.css";
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
    <div className="box">
      <Screen className="display input" value={screenValue} />
      <div className="keys">
        <div>
          <div className="row">
            <Number className="key number" value={1} onClick={() => handleNumberClick(getNewScreenValue(1))} />
            <Number className="key number" value={2} onClick={() => handleNumberClick(getNewScreenValue(2))} />
            <Number className="key number" value={3} onClick={() => handleNumberClick(getNewScreenValue(3))} />
            <Operation className="key operation" value="+" onClick={() => handleOperationClick("+")} />
          </div>
          <div className="row">
            <Number className="key number" value={4} onClick={() => handleNumberClick(getNewScreenValue(4))} />
            <Number className="key number" value={5} onClick={() => handleNumberClick(getNewScreenValue(5))} />
            <Number className="key number" value={6} onClick={() => handleNumberClick(getNewScreenValue(6))} />
            <Operation className="key operation" value="-" onClick={() => handleOperationClick("-")} />
          </div>
          <div className="row">
            <Number className="key number" value={7} onClick={() => handleNumberClick(getNewScreenValue(7))} />
            <Number className="key number" value={8} onClick={() => handleNumberClick(getNewScreenValue(8))} />
            <Number className="key number" value={9} onClick={() => handleNumberClick(getNewScreenValue(9))} />
            <Operation className="key operation" value="/" onClick={() => handleOperationClick("/")} />
          </div>
          <div className="row">
            <Operation className="key operation" value={isAllClear ? "AC" : "C"} onClick={() => clear(isAllClear)} />
            <Number className="key number" value={0}  onClick={() => handleNumberClick(getNewScreenValue(0))} />
            <Operation className="key equal" value="=" onClick={() => handleOperationClick("=")} />
            <Operation className="key operation" value="x" onClick={() => handleOperationClick("x")} />
          </div>
          
        </div>
        
      </div>
    </div>
  );
};

export default Calculator;
