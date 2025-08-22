import React, { useState } from 'react';
import WindowFrame from './WindowFrame';
import { APPS } from '../constants';
import './Calculator.css';

interface CalculatorProps {
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
}

const Calculator: React.FC<CalculatorProps> = ({ onClose, onMinimize, onMaximize, isMaximized }) => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '*':
        return firstValue * secondValue;
      case '/':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const buttons = [
    ['C', '±', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const handleButtonClick = (value: string) => {
    if (value >= '0' && value <= '9') {
      inputNumber(value);
    } else if (value === '.') {
      inputDot();
    } else if (value === 'C') {
      clear();
    } else if (['+', '-', '*', '/', '='].includes(value)) {
      performOperation(value);
    }
  };

  return (
    <WindowFrame
      title={APPS.CALCULATOR}
      onClose={onClose}
      onMinimize={onMinimize}
      onMaximize={onMaximize}
      isMaximized={isMaximized}
      width={300}
      height={400}
    >
      <div className="calculator">
        <div className="calculator-display">
          <div className="display-value">{display}</div>
        </div>
        <div className="calculator-keypad">
          {buttons.map((row, rowIndex) => (
            <div key={rowIndex} className="calculator-row">
              {row.map((button) => (
                <button
                  key={button}
                  className={`calculator-button ${
                    button === '0' ? 'zero' : ''
                  } ${
                    ['+', '-', '*', '/', '='].includes(button) ? 'operator' : ''
                  } ${
                    ['C', '±', '%'].includes(button) ? 'function' : ''
                  }`}
                  onClick={() => handleButtonClick(button)}
                >
                  {button}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
};

export default Calculator;