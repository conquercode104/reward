import { useState, useEffect } from "react";
export const RewardPoints = () => {
    const [transactions, setTransactions] = useState([]);
  
    useEffect(() => {
      // Simulate an API call to fetch the transaction data
      const fetchTransactions = async () => {
        // Make up a data set to demonstrate the solution
        const data = [
          { customer: 'John', month: 'January', amount: 120 },
          { customer: 'John', month: 'February', amount: 80 },
          { customer: 'John', month: 'March', amount: 150 },
          { customer: 'Alice', month: 'January', amount: 60 },
          { customer: 'Alice', month: 'February', amount: 100 },
          { customer: 'Alice', month: 'March', amount: 200 },
        ];
  
        // Simulate the API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        setTransactions(data);
      };
  
      fetchTransactions();
    }, []);
  
    const calculateRewardPoints = (amount) => {
      let points = 0;
  
      if (amount > 100) {
        points += (amount - 100) * 2;
      }
  
      if (amount > 50) {
        points += amount > 100 ? 50 : amount - 50;
      }
  
      return points;
    };
  
    const calculateMonthlyRewardPoints = (customer, month) => {
      const monthlyTransactions = transactions.filter(
        (transaction) =>
          transaction.customer === customer && transaction.month === month
      );
  
      const monthlyPoints = monthlyTransactions.reduce(
        (total, transaction) => total + calculateRewardPoints(transaction.amount),
        0
      );
  
      return monthlyPoints;
    };
  
    const calculateTotalRewardPoints = (customer) => {
      const customerTransactions = transactions.filter(
        (transaction) => transaction.customer === customer
      );
  
      const totalPoints = customerTransactions.reduce(
        (total, transaction) => total + calculateRewardPoints(transaction.amount),
        0
      );
  
      return totalPoints;
    };
  
    return (
      <div>
        <h2>Reward Points</h2>
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Month</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={`${transaction.customer}-${transaction.month}`}>
                <td>{transaction.customer}</td>
                <td>{transaction.month}</td>
                <td>
                  {calculateMonthlyRewardPoints(
                    transaction.customer,
                    transaction.month
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">Total</td>
              <td>{calculateTotalRewardPoints('John')}</td>
            </tr>
            <tr>
              <td colSpan="2">Total</td>
              <td>{calculateTotalRewardPoints('Alice')}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  