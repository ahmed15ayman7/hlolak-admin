import React from 'react';
import { IService } from '@/lib/actions/service.actions';
const LoanTable = ({ service }:{service:IService}) => {
  const loanData = [
    { label: "مبلغ التمويل", key: "loan_amount" },
    { label: "القسط", key: "installment" },
    { label: "المدة/شهر", key: "duration" },
  ];

  const periods = [
    { loan_amount: service?.loan_amount, installment: service?.installment, duration: service?.duration },
    { loan_amount: service?.loan_amount2, installment: service?.installment2, duration: service?.duration2 },
    { loan_amount: service?.loan_amount3, installment: service?.installment3, duration: service?.duration3 },
    { loan_amount: service?.loan_amount4, installment: service?.installment4, duration: service?.duration4 },
  ];

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {loanData.map((item, index) => (
            <th key={index} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
              {item.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {periods.map((period, index) => (
          <tr key={index}>
            {loanData.map((item, subIndex) => (
              <td key={subIndex} style={{ border: '1px solid #ddd', padding: '10px 8px', textAlign: 'center' }}>
                 {/*@ts-ignore*/}
                {period[item.key] || ""}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoanTable;
