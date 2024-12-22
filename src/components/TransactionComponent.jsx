import { useState, useEffect } from "react";

const TransactionCell = (props) => {
  const isExpense = props.payload?.txnType === "Expense";

  return (
    <div className="flex flex-row justify-center pl-9 mt-4">
      <div
        className={`p-4 w-60 h-10 bg-white mb-2 flex justify-between items-center border-r-8 shadow-md rounded-lg ${
          isExpense ? "border-red-500" : "border-green-500"
        }`}
      >
        <span className="font-medium text-gray-700">{props.payload.desc}</span>
        <span className="font-medium text-gray-700">
          {props.payload.amount}
        </span>
      </div>
    </div>
  );
};

const TransactionComponent = (props) => {
  const [filteredTxn, updateTxn] = useState(props.transactions);
  const [searchTxn, updateSearchTxn] = useState("");

  const filteredData = () => {
    if (!searchTxn || !searchTxn.trim().length) {
      updateTxn(props.transactions);
      return;
    }

    const filtered = props.transactions.filter((payload) =>
      payload.desc.toLowerCase().trim().includes(searchTxn.toLowerCase().trim())
    );
    updateTxn(filtered);
  };

  useEffect(() => {
    filteredData();
  }, [searchTxn, props.transactions]);

  return (
    <div className="font-mono mt-4">
      <div className="pl-11">
        <form
          className="flex items-center max-w-sm mx-auto w-60"
          onSubmit={(e) => e.preventDefault()}
        >
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="relative flex">
            <input
              type="text"
              value={searchTxn}
              onChange={(e) => {
                updateSearchTxn(e.target.value);
              }}
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              required
            />
            <button
              type="button"
              className="p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </form>
      </div>
      <div>
        {filteredTxn?.length
          ? filteredTxn.map((payload) => (
              <TransactionCell key={payload.id} payload={payload} />
            ))
          : <span className="pl-9 mt-4">No transactions available</span>}
      </div>
    </div>
  );
};

export default TransactionComponent;
