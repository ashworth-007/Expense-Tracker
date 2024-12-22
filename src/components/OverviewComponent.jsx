import { useState } from "react";


const Toast = ({ message, dismiss }) => (
  <div className="fixed top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3">
    <span>{message}</span>
    <button onClick={dismiss} className="text-white hover:text-gray-300">
      ✕
    </button>
  </div>
);

const AddTransactionView = (props) => {
  const [amount, setAmount] = useState(0);
  const [desc, setDesc] = useState("");
  const [txnType, setTxnType] = useState("Expense");
  const [error, setError] = useState("");

  const addTransaction = () => {
    if (amount <= 0) {
      setError("Add some money!");
      return;
    }

    if (!desc.trim()) {
      setError("Description cannot be empty");
      return;
    }
    
    if (txnType === "Expense" && amount > props.balance) {
      setError("Insufficient Balance!");
      return;
    }
    props.addTransaction({
      amount: Number(amount),
      desc,
      txnType,
      id: Date.now(),
    });
    props.toggleButton();
    setError("");
  };


  // useEffect(() => {
  //   if (error) {
  //     const timer = setTimeout(() => setError(""), 3000);
  //     return () => clearTimeout(timer); // Cleanup on component unmount
  //   }
  // }, [error]);

  const dismissError = () => { setError("");}

  return (
    <div className=" w-full">
      {" "}
      {error && <Toast message={error} dismiss={dismissError} />}
      <div class="mt-8 mb-6 flex justify-center">
        {" "}
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          id="default-input"
          placeholder="Amount"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 sm:w-1/3 md:w-1/3 lg:w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />{" "}
      </div>{" "}
      <div class="mb-6 flex justify-center">
        {" "}
        <input
          required
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
          type="text"
          id="default-input"
          placeholder="Description"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-4/5 sm:w-1/3 md:w-1/3 lg:w-1/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />{" "}
      </div>{" "}
      <div class="flex justify-center space-x-6">
        {" "}
        <div class="flex items-center p-2 bg-white shadow-md rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-700">
          {" "}
          <input
            onChange={(e) => {
              setTxnType(e.target.value);
            }}
            checked={txnType === "Expense"}
            id="expense-radio"
            type="radio"
            value="Expense"
            name="bordered-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />{" "}
          <label
            for="expense-radio"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Expense{" "}
          </label>{" "}
        </div>{" "}
        <div class="flex items-center p-2 bg-white shadow-md rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-700">
          {" "}
          <input
            onChange={(e) => {
              setTxnType(e.target.value);
            }}
            checked={txnType === "Income"}
            id="income-radio"
            type="radio"
            value="Income"
            name="bordered-radio"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />{" "}
          <label
            for="income-radio"
            class="ml-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            {" "}
            Income{" "}
          </label>{" "}
        </div>{" "}
      </div>{" "}
      <button
        onClick={addTransaction}
        class=" mt-4 w-56 relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
      >
        {" "}
        <span class="relative w-56 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          {" "}
          Add Transaction{" "}
        </span>{" "}
      </button>{" "}
    </div>
  );
};
const OverviewComponent = (props) => {
  const [isAddTxnVisible, setAddTxnVisible] = useState(true);
  const toggleButton = () => {
    setAddTxnVisible(!isAddTxnVisible);
  };
  return (
    <div className="flex flex-col items-center font-mono mt-4 pl-10">
      {" "}
      <div className="flex text-green-600 font-bold justify-evenly mb-4">
        {" "}
        Balance: ₹{props.balance}{" "}
        <button
          onClick={toggleButton}
          className="bg-gray-700 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-16 rounded"
        >
          {" "}
          {isAddTxnVisible ? "Cancel" : "ADD"}{" "}
        </button>{" "}
      </div>{" "}
      {isAddTxnVisible && (
        <AddTransactionView
          toggleButton={toggleButton}
          addTransaction={props.addTransaction}
        />
      )}{" "}
      <div className="flex justify-center space-x-4 mt-4">
        {" "}
        <div className="flex flex-col w-32 h-16 border p-2 shadow-lg rounded-lg bg-white">
          {" "}
          <span className="text-black font-bold">Expense</span>{" "}
          <span className="text-red-600 font-bold">₹{props.expense}</span>{" "}
        </div>{" "}
        <div className="flex flex-col w-32 h-16 border p-2 shadow-lg rounded-lg bg-white">
          {" "}
          <span className="text-black font-bold">Income</span>{" "}
          <span className="text-green-600 font-bold">₹{props.income}</span>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default OverviewComponent;