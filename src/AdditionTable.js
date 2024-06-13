import React, { useState } from 'react';
import './AdditionTable.css';

const AdditionTable = () => {
  const initialRows = [
    { num1: 1, num2: 0, userInput: '', isCorrect: null, showCheckButton: false },
    { num1: 2, num2: 1, userInput: '', isCorrect: null, showCheckButton: false }
  ];

  const [rows, setRows] = useState(initialRows);

  const handleInputChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Allow only digits

    setRows(rows.map((row, i) => {
      if (i === index) {
        return {
          ...row,
          userInput: value,
          isCorrect: null,
          showCheckButton: value !== ''
        };
      }
      return row;
    }));
  };

  const handleCheck = (index) => {
    setRows(rows.map((row, i) => {
      if (i === index) {
        const sum = row.num1 + row.num2;
        return {
          ...row,
          isCorrect: parseInt(row.userInput) === sum,
          showCheckButton: false
        };
      }
      return row;
    }));
  };



  // Function to format the index with superscript
  const formatIndex = (index) => {
    const suffixes = ['st', 'nd', 'rd'];
    const v = index + 1;
    const suffix = suffixes[(v % 10) - 1] || 'th';
    const formattedIndex = `${v}<sup>${suffix}</sup>`;
    return <span dangerouslySetInnerHTML={{ __html: formattedIndex }} />;
  };

  return (
    <div>
      <table>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{formatIndex(index)}</td>
              <td>{row.num1}</td>
              <td>{row.num2}</td>
              <td>
                <div className="input-container">
                  <input
                    type="text"
                    value={row.userInput}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    style={{
                      backgroundColor: 'white',
                      borderColor: row.isCorrect === null ? 'initial' : row.isCorrect ? 'green' : 'red',
                      color: 'black'
                    }}
                  />
                  {row.showCheckButton && (
                    <button onClick={() => handleCheck(index)}>Check</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdditionTable;
