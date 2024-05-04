import React from "react";
import { useEffect, useState } from "react";

const OSForm = () => {
  const [algorithm, setAlgorithm] = useState("");
  const [arrayString, setArrayString] = useState();
  const [array, setArray] = useState([]);
  const [search, setSearch] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [position, setPosition] = useState(0);

  const handleSubmit = async () => {
    setButtonPressed(true);
    setArray(arrayString.split(","));

    if (algorithm == "LS") {
      LinearSearch();
    }
  };

  const LinearSearch = async () => {
    for (let i = 0; i < array.length; i++) {
      if (search == array[i]) {
        setPosition(i + 1);
      }
    }
  };

  return (
    <>
      <div className="bg-slate-800 pt-5 min-h-screen max-h-full">
        <div className="w-1/2 flex mx-auto ">
          <form
            // onSubmit={handleSubmit}
            className="new-item-form"
          >
            <div className="form-row">
              <div class="mb-6">
                <div class="grid grid-cols-4 gap-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
                    Choose Algorithm:
                  </label>
                  <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={algorithm}
                    onChange={(e) => {
                      setAlgorithm(e.target.value);
                    }}
                  >
                    <option selected>Choose an algorithm</option>
                    <option value="LS">Linear Search</option>
                    <option value="BS">Binary Search</option>
                    <option value="BBS">Bubble Sort</option>
                    <option value="SS">Selection Sort</option>
                  </select>
                  <input
                    type="text"
                    id="processes"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Array"
                    value={arrayString}
                    onChange={(e) => setArrayString(e.target.value)}
                    required
                  />
                  {(algorithm == "LS" || algorithm == "BS") && (
                    <input
                      type="text"
                      id="processes"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      // onKeyDown={handleKeyDown}
                      required
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                // onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={handleSubmit}
              >
                Add
              </button>
            </div>

            {/* <div className="text-right mt-5">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                // onClick={() => {
                //   handleAlgorithm();
                // }}
              >
                Generate
              </button>
            </div> */}

            <div className="flex flex-row mt-10 h-10">
              {buttonPressed &&
                array.length > 0 &&
                array.map((term, index) => {
                  return (
                    <div
                      className={`${
                        index % 2 == 0 ? "bg-slate-500" : "bg-slate-600"
                      }`}
                      style={{
                        width: `${(1 / array.length) * 100}%`,
                      }}
                    >
                      <p className="">{term}</p>
                    </div>
                  );
                })}
            </div>
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
              Position: {position}
            </label>
          </form>
        </div>
      </div>
    </>
  );
};

export default OSForm;
