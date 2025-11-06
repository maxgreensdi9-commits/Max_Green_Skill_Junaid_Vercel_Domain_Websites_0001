
import React, { useState } from 'react';
import CalculatorDisplay from './components/CalculatorDisplay';
import CalculatorButton from './components/CalculatorButton';

const App: React.FC = () => {
  const [input, setInput] = useState<string>('0');
  const [operator, setOperator] = useState<string | null>(null);
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [isNewEntry, setIsNewEntry] = useState<boolean>(true);

  const handleNumberClick = (value: string) => {
    if (isNewEntry) {
      setInput(value);
      setIsNewEntry(false);
    } else {
      setInput(prevInput => (prevInput === '0' ? value : prevInput + value));
    }
  };

  const handleDecimalClick = () => {
    if (!input.includes('.')) {
      setInput(prevInput => prevInput + '.');
      setIsNewEntry(false);
    }
  };

  const handleOperatorClick = (op: string) => {
    if (operator && prevValue && !isNewEntry) {
        handleEqualsClick();
        setPrevValue(input); // Use the new result for next operation
    } else {
        setPrevValue(input);
    }
    setOperator(op);
    setIsNewEntry(true);
  };

  const handleEqualsClick = () => {
    if (!operator || prevValue === null) return;

    const current = parseFloat(input);
    const previous = parseFloat(prevValue);
    let result: number;

    switch (operator) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        if (current === 0) {
          setInput('Error');
          resetCalculatorState();
          return;
        }
        result = previous / current;
        break;
      default:
        return;
    }

    const resultString = result.toString();
    setInput(resultString.slice(0, 12)); // Limit display length
    setPrevValue(resultString);
    setOperator(null);
    setIsNewEntry(true);
  };
  
  const resetCalculatorState = () => {
    setOperator(null);
    setPrevValue(null);
    setIsNewEntry(true);
  };

  const handleClearClick = () => {
    setInput('0');
    resetCalculatorState();
  };
  
  const handleSignClick = () => {
      if(input !== '0') {
          setInput(prevInput => (parseFloat(prevInput) * -1).toString());
      }
  };
  
  const handlePercentClick = () => {
      setInput(prevInput => (parseFloat(prevInput) / 100).toString());
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-emerald-50 dark:bg-gray-800 p-4">
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border-4 border-gray-200 dark:border-gray-700">
        <header className="p-4 bg-emerald-600 text-white text-center">
            <h1 className="text-xl font-bold">Max Green Skills</h1>
            <p className="text-sm opacity-80">Development Organization</p>
        </header>
        <div className="p-4">
            <CalculatorDisplay value={input} />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {/* Row 1 */}
              <CalculatorButton onClick={handleClearClick} className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white">AC</CalculatorButton>
              <CalculatorButton onClick={handleSignClick} className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white">+/-</CalculatorButton>
              <CalculatorButton onClick={handlePercentClick} className="bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-black dark:text-white">%</CalculatorButton>
              <CalculatorButton onClick={() => handleOperatorClick('/')} className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl">÷</CalculatorButton>
              
              {/* Row 2 */}
              <CalculatorButton onClick={() => handleNumberClick('7')}>7</CalculatorButton>
              <CalculatorButton onClick={() => handleNumberClick('8')}>8</CalculatorButton>
              <CalculatorButton onClick={() => handleNumberClick('9')}>9</CalculatorButton>
              <CalculatorButton onClick={() => handleOperatorClick('*')} className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl">×</CalculatorButton>

              {/* Row 3 */}
              <CalculatorButton onClick={() => handleNumberClick('4')}>4</CalculatorButton>
              <CalculatorButton onClick={() => handleNumberClick('5')}>5</CalculatorButton>
              <CalculatorButton onClick={() => handleNumberClick('6')}>6</CalculatorButton>
              <CalculatorButton onClick={() => handleOperatorClick('-')} className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl">-</CalculatorButton>

              {/* Row 4 */}
              <CalculatorButton onClick={() => handleNumberClick('1')}>1</CalculatorButton>
              <CalculatorButton onClick={() => handleNumberClick('2')}>2</CalculatorButton>
              <CalculatorButton onClick={() => handleNumberClick('3')}>3</CalculatorButton>
              <CalculatorButton onClick={() => handleOperatorClick('+')} className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl">+</CalculatorButton>
              
              {/* Row 5 */}
              <CalculatorButton onClick={() => handleNumberClick('0')} className="col-span-2">0</CalculatorButton>
              <CalculatorButton onClick={handleDecimalClick}>.</CalculatorButton>
              <CalculatorButton onClick={handleEqualsClick} className="bg-emerald-500 hover:bg-emerald-600 text-white text-2xl">=</CalculatorButton>
            </div>
        </div>
      </div>
       <footer className="text-center mt-6 text-gray-500 dark:text-gray-400 text-sm">
        <p>Designed for Max Green Skills Development Organization</p>
      </footer>
    </div>
  );
};

export default App;
