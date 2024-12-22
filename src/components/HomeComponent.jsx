import OverviewComponent from "./OverviewComponent";
import TransactionComponent from "./TransactionComponent";
import { useEffect, useState } from "react";

const HomeComponent = (props) => {
  const [transactions, updateTransactions] = useState([]);
  const [expense, updateExpense] = useState(0);
  const [income, updateIncome] = useState(0);
  const [balance, updateBalance] = useState(0);

  //   const addTransaction = (payload) => {
  //     const transactionArray = [...transactions];
  //     transactionArray.push(payload);
  //     updateTransactions(transactionArray);
  //   };

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      updateTransactions(JSON.parse(savedTransactions));
    }
  }, []);
  
  const addTransaction = (payload) => {
    const transactionArray = [...transactions];
    transactionArray.push(payload);
    updateTransactions(transactionArray);
    localStorage.setItem("transactions", JSON.stringify(transactionArray));
  };

  const calculateBalance = () => {
    let exp = 0;
    let inc = 0;
    transactions.map((payload) => {
      payload.txnType === "Expense"
        ? (exp += payload.amount)
        : (inc += payload.amount);
    });

    updateExpense(exp);
    updateIncome(inc);
    let newBalance = inc - exp;
    updateBalance(newBalance);
  };

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  return (
    <div className="mt-4 font-mono ">
      <OverviewComponent
        addTransaction={addTransaction}
        income={income}
        expense={expense}
        balance={balance}
      />
      <TransactionComponent transactions={transactions} />
    </div>
  );
};

export default HomeComponent;
