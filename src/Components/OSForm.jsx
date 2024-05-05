import React from "react";
import { useEffect, useState } from "react";

const OSForm = () => {
  const [algorithm, setAlgorithm] = useState("");
  const [arrayString, setArrayString] = useState("");
  const [array, setArray] = useState([]);
  const [search, setSearch] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [position, setPosition] = useState();
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);
  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [steps, setSteps] = useState(0);
  const [processDone, setProcessDone] = useState(false);

  useEffect(() => {
    if (algorithm === "LS" && buttonPressed) {
      LinearSearch();
    } else if (algorithm === "BS" && buttonPressed) {
      BinarySearch();
    } else if (algorithm === "BBS" && buttonPressed) {
      BubbleSort();
    } else if (algorithm === "SS" && buttonPressed) {
      SelectionSort();
    }
  }, [buttonPressed]);

  const handleSubmit = async () => {
    console.log(algorithm);
    let tempArray = arrayString.split(",").map(function (item) {
      return parseInt(item.trim(), 10);
    });

    if (tempArray.some(isNaN)) {
      setInputError(true);
      return;
    }

    if ((algorithm === "LS" || algorithm === "BS") && isNaN(search)) {
      setInputError(true);
      return;
    }

    if (!algorithm) {
      setInputError(true);
      return;
    }
    setInputError(false);
    setArray(tempArray);
    setButtonPressed(true);
  };

  const LinearSearch = async () => {
    for (let i = 0; i < array.length; i++) {
      setHighlightedIndex(i);
      await new Promise((resolve) => setTimeout(resolve, 650));
      if (search === array[i]) {
        setPosition(i + 1);
        setHighlightedIndex(null);
        setSteps((prevSteps) => prevSteps + 1);
        setProcessDone(true);
        return;
      } else {
        setSteps((prevSteps) => prevSteps + 1);
      }
    }
    setError(true);
    setHighlightedIndex(null);
  };

  const BinarySearch = async () => {
    array.sort(function (a, b) {
      return a - b;
    });
    let low = 0;
    let high = array.length - 1;

    while (low <= high) {
      let mid = Math.floor((low + high) / 2);
      setHighlightedIndex(mid);
      await new Promise((resolve) => setTimeout(resolve, 650));
      if (array[mid] === search) {
        setPosition(mid + 1);
        setHighlightedIndex(null);
        setSteps((prevSteps) => prevSteps + 1);
        setProcessDone(true);
        return;
      } else if (array[mid] < search) {
        low = mid + 1;
        setSteps((prevSteps) => prevSteps + 1);
      } else {
        high = mid - 1;
        setSteps((prevSteps) => prevSteps + 1);
      }
    }
    setError(true);
    setHighlightedIndex(null);
  };

  const BubbleSort = async () => {
    let arr = [...array];
    let n = arr.length;
    do {
      for (let i = 0; i < n - 1; i++) {
        setHighlightedIndexes([i, i + 1]);
        await new Promise((resolve) => setTimeout(resolve, 650));
        setSteps((prevSteps) => prevSteps + 1);
        if (arr[i] > arr[i + 1]) {
          let temp = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = temp;
          setArray([...arr]);
        }
      }
      n--;
    } while (n > 1);
    setProcessDone(true);
    setHighlightedIndexes(null);
  };
  const SelectionSort = async () => {
    let arr = [...array];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        setHighlightedIndexes([minIndex, j]);
        await new Promise((resolve) => setTimeout(resolve, 650));
        setSteps((prevSteps) => prevSteps + 1);

        if (arr[j] < arr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        setArray([...arr]);
      }
    }
    setProcessDone(true);
    setHighlightedIndexes(null);
  };

  const handleReset = () => {
    setAlgorithm("");
    setArrayString("");
    setArray([]);
    setSearch("");
    setButtonPressed(false);
    setPosition(null);
    setHighlightedIndex(null);
    setHighlightedIndexes([]);
    setError(false);
    setInputError(false);
    setSteps(0);
    setProcessDone(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <div className="bg-slate-800 pt-5 min-h-screen max-h-full flex justify-content-center">
        <div
          className="w-full max-w-3/4"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <form className="new-item-form">
            <div className="form-row">
              {/* User input */}
              <div className="mb-6">
                <div
                  className={`grid gap-4 ${
                    algorithm === "LS" || algorithm === "BS"
                      ? "grid-cols-4"
                      : "grid-cols-3"
                  }`}
                >
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
                    Choose Algorithm:
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Comma separated array"
                    value={arrayString}
                    onChange={(e) => setArrayString(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                  {(algorithm === "LS" || algorithm === "BS") && (
                    <input
                      type="text"
                      id="processes"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search for"
                      value={search}
                      onChange={(e) => setSearch(Number(e.target.value))}
                      onKeyDown={handleKeyDown}
                      required
                    />
                  )}
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={handleSubmit}
                disabled={buttonPressed}
              >
                Play
              </button>
            </div>
            {/* Input error handling */}
            <div>
              {inputError === true && (
                <label className="block mb-10 mt-5 text-m font-medium text-red-500 dark:text-red-500 my-auto">
                  Please enter correct input
                </label>
              )}
            </div>
            {/* GUI grid with animation */}
            <div className="flex flex-row mt-20 h-16">
              {buttonPressed &&
                array.length > 0 &&
                array.map((term, index) => (
                  <div
                    key={index}
                    className={`${
                      index === position - 1
                        ? "bg-green-500"
                        : index === highlightedIndex ||
                          highlightedIndexes?.includes(index)
                        ? "bg-blue-500 border-x border-slate-800"
                        : index % 2 === 0
                        ? "bg-slate-500"
                        : "bg-slate-600"
                    } flex justify-center items-center`}
                    style={{
                      width: `${(1 / array.length) * 100}%`,
                    }}
                  >
                    <p className="font-semibold text-lg">{term}</p>
                  </div>
                ))}
            </div>
            {/* Information about the process */}
            <div>
              {buttonPressed && (
                <label className="block mb-2 mt-10 text-m font-medium text-gray-900 dark:text-white my-auto">
                  Steps: {steps}
                </label>
              )}
              {buttonPressed && (
                <label className="block mb-2 mt-4 text-m font-medium text-gray-900 dark:text-white my-auto">
                  Running Time: {steps * 650}ms
                </label>
              )}
              {buttonPressed &&
                position != null &&
                error === false &&
                (algorithm === "LS" || algorithm === "BS") && (
                  <label className="block mb-2 mt-4 text-m font-medium text-gray-900 dark:text-white my-auto">
                    Position:{" "}
                    <label className="text-m font-medium text-green-500 dark:text-green-500 ">
                      {position}
                    </label>
                  </label>
                )}
            </div>
            {/* Term not found error */}
            <div>
              {buttonPressed &&
                error === true &&
                (algorithm === "LS" || algorithm === "BS") && (
                  <label className="block mb-2 mt-10 text-m font-medium text-red-500 dark:text-red-500 my-auto">
                    The term does not exist in the array
                  </label>
                )}
            </div>
            {/* Information about the algorithm */}
            {processDone && (
              <section class="bg-white dark:bg-gray-900">
                <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                  <div class="max-w-screen-lg text-gray-500 sm:text-lg dark:text-gray-400">
                    <h2 class="mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white">
                      {algorithm === "LS" && `Linear Search`}
                      {algorithm === "BS" && `Binary Search`}
                      {algorithm === "BBS" && `Bubble Sort`}
                      {algorithm === "SS" && `Selection Sort`}
                    </h2>
                    {algorithm === "LS" && (
                      <p class="mb-4 font-light">
                        Linear search is a simple searching algorithm that
                        sequentially checks each element in a list until the
                        target element is found or the end of the list is
                        reached. It starts from the beginning and compares each
                        element with the target until a match is found. Linear
                        search is easy to implement and works well with small
                        datasets. However, its time complexity is O(n), making
                        it inefficient for large datasets compared to other
                        search algorithms like binary search. Linear search is
                        often used when the list is unordered or when the
                        dataset is small. It is commonly implemented in
                        languages like C, Java, and Python for basic search
                        operations.
                      </p>
                    )}
                    {algorithm === "BS" && (
                      <p class="mb-4 font-light">
                        Binary search is a highly efficient searching algorithm
                        used to find the position of a target value within a
                        sorted array or list. It works by repeatedly dividing
                        the search interval in half until the target element is
                        found or the interval is empty. Binary search requires
                        the list to be sorted beforehand, which allows it to
                        quickly narrow down the search space. With a time
                        complexity of O(log n), binary search is significantly
                        faster than linear search for large datasets. It's
                        commonly used in computer science and software
                        development for tasks like searching in databases and
                        maintaining sorted collections. However, it may not be
                        suitable for unsorted data or data that frequently
                        changes its order.
                      </p>
                    )}
                    {algorithm === "BBS" && (
                      <p class="mb-4 font-light">
                        Bubble sort is a simple sorting algorithm that
                        repeatedly steps through the list, compares adjacent
                        elements, and swaps them if they are in the wrong order.
                        It gets its name because smaller elements "bubble" to
                        the top of the list with each pass. Bubble sort has a
                        time complexity of O(n<sup>2</sup>), making it
                        inefficient for large datasets, but it's easy to
                        understand and implement. Despite its inefficiency,
                        bubble sort can be useful for teaching purposes or for
                        sorting small datasets where simplicity is preferred
                        over speed. However, it's rarely used in practice due to
                        its poor performance compared to more efficient sorting
                        algorithms like quicksort or mergesort.
                      </p>
                    )}
                    {algorithm === "SS" && (
                      <p class="mb-4 font-light">
                        Selection sort is a sorting algorithm that divides the
                        input list into two parts: the sorted sublist and the
                        unsorted sublist. It repeatedly finds the minimum
                        element from the unsorted sublist and swaps it with the
                        first unsorted element, thereby growing the sorted
                        sublist. Selection sort has a time complexity of O(n
                        <sup>2</sup>) as it involves nested loops to find the
                        minimum element. Despite its inefficiency for large
                        datasets, selection sort can be practical for small
                        lists or as a building block for more complex sorting
                        algorithms.
                      </p>
                    )}
                    <a
                      href={
                        algorithm === "LS"
                          ? "https://www.geeksforgeeks.org/linear-search/"
                          : algorithm === "BS"
                          ? "https://www.geeksforgeeks.org/binary-search/"
                          : algorithm === "BBS"
                          ? "https://www.geeksforgeeks.org/bubble-sort/"
                          : algorithm === "SS"
                          ? "https://www.geeksforgeeks.org/selection-sort/"
                          : ""
                      }
                      class="inline-flex items-center font-medium text-primary-600 hover:text-primary-800 dark:text-primary-500 dark:hover:text-primary-700"
                    >
                      Learn more
                      <svg
                        class="ml-1 w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </section>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default OSForm;
