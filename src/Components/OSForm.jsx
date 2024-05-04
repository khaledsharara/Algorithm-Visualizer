import React from "react";
import { useEffect, useState } from "react";

const OSForm = () => {
  const [numOfProcesses, setNumOfProcesses] = useState(1);
  const [processes, setProcesses] = useState([]);
  const [algorithm, setAlgorithm] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);
  const [waitingTimeArray, setWaitingTimeArray] = useState([]);
  const processedIds = new Set();

  const [arrival_time, setArrival_time] = useState("");
  const [priority, setPriority] = useState("");
  const [burst, setBurst] = useState("");
  const [finalAvgTAT, setFinalAvgTAT] = useState(0);
  const [finalAvgWT, setFinalAvgWT] = useState(0);
  const [RRTimeQuantum, setRRTimeQuantum] = useState("");
  const [tableProcesses, setTableProcesses] = useState([]);

  const burstSum = () => {
    return processes.reduce((sum, process) => sum + parseInt(process.burst), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setProcesses((currentProcesses) => {
      return [
        ...currentProcesses,
        {
          id: Number(numOfProcesses),
          arrival_time: Number(arrival_time),
          priority: Number(priority),
          burst: Number(burst),
          turnaroundTime: 0,
          waitingTime: 0,
        },
      ];
    });
    setTableProcesses((currentProcesses) => {
      return [
        ...currentProcesses,
        {
          id: Number(numOfProcesses),
          arrival_time: Number(arrival_time),
          priority: Number(priority),
          burst: Number(burst),
          turnaroundTime: 0,
          waitingTime: 0,
        },
      ];
    });

    setArrival_time("");
    setPriority("");
    setBurst("");
    setNumOfProcesses(numOfProcesses + 1);
  };

  const handleReset = () => {
    setButtonPressed(false);
    setProcesses([]);
    setNumOfProcesses(1);
    setWaitingTimeArray([]);
    setArrival_time("");
    setPriority("");
    setBurst("");
    setAlgorithm("");
    setFinalAvgTAT(0);
    setFinalAvgWT(0);
    processedIds.clear();
    setTableProcesses([]);
  };

  const handleWaitingTime = () => {
    let waitingTimeArrayTemp = [];

    waitingTimeArrayTemp = processes.reduce(
      (accumulator, process) => {
        const currentWaitingTime =
          accumulator.length > 0
            ? accumulator[accumulator.length - 1]
            : processes[0].arrival_time;
        const newWaitingTime = currentWaitingTime + Number(process.burst);
        return [...accumulator, newWaitingTime];
      },
      [Number(processes[0].arrival_time)]
    );
    setWaitingTimeArray(waitingTimeArrayTemp);
  };

  const handleAlgorithm = () => {
    setButtonPressed(true);

    if (algorithm === "FCFS") {
      const sortedProcesses = [...processes];
      sortedProcesses.sort((a, b) => a.arrival_time - b.arrival_time);
      setProcesses(sortedProcesses);
    } else if (algorithm === "SJF-NP") {
      runSJF_NP();
      console.log("Processes at handleAlgorithm is ", processes);
    } else if (algorithm === "P-NP") {
      runPriority_NP();
    } else if (algorithm === "SJF-P") {
      runSJF_P();
    } else if (algorithm === "P-P") {
      runPriority_P();
    } else if (algorithm === "RR") {
      runRoundRobin(typeof RRTimeQuantum);
    }
  };

  const runSJF_NP = () => {
    let minArrivalTimeProcess = Math.min(
      ...processes.map((process) => Number(process.arrival_time))
    );

    const burstTotal = processes.reduce(
      (sum, process) => sum + Number(process.burst),
      0
    );
    // const minArrivalTime = Math.min(
    //   ...processes.map((process) => Number(process.arrival_time))
    // );

    let maxArrivalTimeProcess = burstTotal + minArrivalTimeProcess;

    let queuedProcesses = [];
    let organizedProcesses = [];
    let totalBurstTime = Number(minArrivalTimeProcess);

    for (
      let t = Number(minArrivalTimeProcess);
      t <= Number(maxArrivalTimeProcess);
      t++
    ) {
      //find index of first process with arrival time == t
      const foundProcesses = processes.filter(
        (process) => Number(process.arrival_time) === t
      );

      if (foundProcesses.length > 0) {
        queuedProcesses.push(...foundProcesses);
      }

      if (totalBurstTime === t && queuedProcesses.length > 0) {
        //sort queuedProcesses by burst time
        queuedProcesses.sort((a, b) => a.burst - b.burst);
        //add to organizedProcesses
        organizedProcesses.push(queuedProcesses[0]);

        totalBurstTime += Number(queuedProcesses[0].burst);
        //remove from queuedProcesses
        queuedProcesses.shift();
      }
    }
    setProcesses(organizedProcesses);
  };
  const runPriority_NP = () => {
    let minArrivalTimeProcess = Math.min(
      ...processes.map((process) => Number(process.arrival_time))
    );

    const burstTotal = processes.reduce(
      (sum, process) => sum + Number(process.burst),
      0
    );
    // const minArrivalTime = Math.min(
    //   ...processes.map((process) => Number(process.arrival_time))
    // );

    let maxArrivalTimeProcess = burstTotal + minArrivalTimeProcess;

    let queuedProcesses = [];
    let organizedProcesses = [];
    let totalBurstTime = Number(minArrivalTimeProcess);

    for (
      let t = Number(minArrivalTimeProcess);
      t <= Number(maxArrivalTimeProcess);
      t++
    ) {
      //find index of first process with arrival time == t
      const foundProcesses = processes.filter(
        (process) => Number(process.arrival_time) === t
      );

      if (foundProcesses.length > 0) {
        queuedProcesses.push(...foundProcesses);
      }

      if (totalBurstTime === t && queuedProcesses.length > 0) {
        //sort queuedProcesses by burst time
        queuedProcesses.sort((a, b) => b.priority - a.priority);
        //add to organizedProcesses
        organizedProcesses.push(queuedProcesses[0]);

        totalBurstTime += Number(queuedProcesses[0].burst);
        //remove from queuedProcesses
        queuedProcesses.shift();
      }
    }
    setProcesses(organizedProcesses);
  };
  const runSJF_P = () => {
    let processesCopy = processes.map((process) => ({
      ...process,
      remainingBurstTime: Number(process.burst),
    }));

    let minArrivalTimeProcess = Math.min(
      ...processesCopy.map((process) => Number(process.arrival_time))
    );

    const burstTotal = processesCopy.reduce(
      (sum, process) => sum + Number(process.burst),
      0
    );
    const minArrivalTime = Math.min(
      ...processesCopy.map((process) => Number(process.arrival_time))
    );

    let maxArrivalTimeProcess = burstTotal + minArrivalTime;

    let queuedProcesses = [];
    let organizedProcesses = [];
    let totalBurstTime = Number(minArrivalTimeProcess);

    for (
      let t = Number(minArrivalTimeProcess);
      t <= Number(maxArrivalTimeProcess);
      t++
    ) {
      //find index of first process with arrival time == t
      const foundProcesses = processesCopy.filter(
        (process) => Number(process.arrival_time) === t
      );

      if (foundProcesses.length > 0) {
        queuedProcesses.push(...foundProcesses);
      }

      if (queuedProcesses.length > 0) {
        //sort queuedProcesses by burst time
        queuedProcesses.sort(
          (a, b) => a.remainingBurstTime - b.remainingBurstTime
        );

        //add to organizedProcesses
        organizedProcesses.push(queuedProcesses[0]);

        totalBurstTime += 1;
        //remove from queuedProcesses
        if (queuedProcesses[0].remainingBurstTime > 1) {
          queuedProcesses[0].remainingBurstTime -= 1;
        } else {
          queuedProcesses.shift();
        }
      }
    }

    let finalProcesses = [];

    let currentProcess = organizedProcesses[0];
    currentProcess.burst = 1;

    for (let i = 1; i < organizedProcesses.length; i++) {
      const current = organizedProcesses[i];
      const previous = organizedProcesses[i - 1];

      if (
        current.id === previous.id &&
        current.arrival_time === previous.arrival_time &&
        current.priority === previous.priority
      ) {
        // Consecutive duplicate, update burst
        currentProcess.burst += 1;
      } else {
        // Not a consecutive duplicate, push the current process and start a new one
        finalProcesses.push({ ...currentProcess });
        currentProcess = { ...current };
        currentProcess.burst = 1;
      }
    }

    // Push the last process
    finalProcesses.push({ ...currentProcess });
    setProcesses(finalProcesses);
  };
  const runPriority_P = () => {
    let processesCopy = processes.map((process) => ({
      ...process,
      remainingBurstTime: Number(process.burst),
    }));

    let minArrivalTimeProcess = Math.min(
      ...processesCopy.map((process) => Number(process.arrival_time))
    );

    const burstTotal = processesCopy.reduce(
      (sum, process) => sum + Number(process.burst),
      0
    );
    const minArrivalTime = Math.min(
      ...processesCopy.map((process) => Number(process.arrival_time))
    );

    let maxArrivalTimeProcess = burstTotal + minArrivalTime;

    let queuedProcesses = [];
    let organizedProcesses = [];
    let totalBurstTime = Number(minArrivalTimeProcess);

    for (
      let t = Number(minArrivalTimeProcess);
      t <= Number(maxArrivalTimeProcess);
      t++
    ) {
      //find index of first process with arrival time == t
      const foundProcesses = processesCopy.filter(
        (process) => Number(process.arrival_time) === t
      );

      if (foundProcesses.length > 0) {
        queuedProcesses.push(...foundProcesses);
      }

      if (queuedProcesses.length > 0) {
        //sort queuedProcesses by burst time
        queuedProcesses.sort((a, b) => Number(b.priority) - Number(a.priority));

        //add to organizedProcesses
        organizedProcesses.push(queuedProcesses[0]);

        totalBurstTime += 1;
        //remove from queuedProcesses
        if (queuedProcesses[0].remainingBurstTime > 1) {
          queuedProcesses[0].remainingBurstTime -= 1;
        } else {
          queuedProcesses.shift();
        }
      }
    }

    let finalProcesses = [];

    let currentProcess = organizedProcesses[0];
    currentProcess.burst = 1;

    for (let i = 1; i < organizedProcesses.length; i++) {
      const current = organizedProcesses[i];
      const previous = organizedProcesses[i - 1];

      if (
        current.id === previous.id &&
        current.arrival_time === previous.arrival_time &&
        current.priority === previous.priority
      ) {
        // Consecutive duplicate, update burst
        currentProcess.burst += 1;
      } else {
        // Not a consecutive duplicate, push the current process and start a new one
        finalProcesses.push({ ...currentProcess });
        currentProcess = { ...current };
        currentProcess.burst = 1;
      }
    }

    // Push the last process
    finalProcesses.push({ ...currentProcess });
    setProcesses(finalProcesses);
  };
  const runRoundRobin = (timeQuantum) => {
    let processesCopy = processes.map((process) => ({
      ...process,
      remainingBurstTime: Number(process.burst),
    }));

    let queuedProcesses = [];
    let organizedProcesses = [];
    queuedProcesses = processesCopy;

    let counter = 0;

    while (queuedProcesses.length > 0) {
      if (queuedProcesses[counter].remainingBurstTime - timeQuantum <= 0) {
        if (
          queuedProcesses[counter].id ===
          organizedProcesses[organizedProcesses.length - 1]?.id
        ) {
          organizedProcesses[organizedProcesses.length - 1].burst +=
            queuedProcesses[counter].burst % timeQuantum || timeQuantum;
          queuedProcesses.splice(counter, 1);
        } else {
          queuedProcesses[counter].burst =
            queuedProcesses[counter].burst % timeQuantum || timeQuantum;
          organizedProcesses.push(queuedProcesses[counter]);
          queuedProcesses.splice(counter, 1);
        }
      } else {
        if (
          queuedProcesses[counter].id ===
          organizedProcesses[organizedProcesses.length - 1]?.id
        ) {
          organizedProcesses[organizedProcesses.length - 1].burst +=
            timeQuantum;
        } else {
          queuedProcesses[counter].remainingBurstTime -= timeQuantum;
          const pushedProcess = { ...queuedProcesses[counter] };
          pushedProcess.burst = timeQuantum;
          organizedProcesses.push(pushedProcess);
        }
        counter++;
      }
      if (counter > queuedProcesses.length - 1) {
        counter = 0;
      }
    }

    for (let i = 0; i < organizedProcesses.length; i++) {}
    setProcesses(organizedProcesses);
  };

  const sumClones = (clonedProcesses) => {
    if (Array.isArray(clonedProcesses)) {
      let counter = 1;
      const result = [];

      for (let i = 0; i < clonedProcesses.length; i++) {
        const process = clonedProcesses[i];
        const isClone = i > 0 && process.id === clonedProcesses[i - 1].id;

        if (isClone) {
          result[result.length - 1].burst += process.burst;
        } else {
          if (counter > 1) {
            // Divide process.burst only if it's not the first occurrence
            process.burst /= counter;
          }

          result.push({ ...process });
          counter = 1;
        }

        counter++; // Increment counter for each process
      }

      return result;
    }
  };

  const handleINFO = () => {
    for (let i = 0; i < processes.length; i++) {
      let totalBurst = 0;
      let isRepeated = false;
      for (let j = 0; j <= i; j++) {
        totalBurst += processes[j].burst;
      }
      totalBurst += processes[0].arrival_time;
      for (let x = i + 1; x < processes.length; x++) {
        if (processes[i].id === processes[x].id) {
          isRepeated = true;
        }
      }
      if (!isRepeated) {
        processes[i].turnaroundTime = totalBurst - processes[i].arrival_time;
        processes[i].waitingTime =
          processes[i].turnaroundTime -
          findLastInstanceById(tableProcesses, processes[i].id).burst;
        //console log the calculations for each process and writing how the numbers are added or subtracted etc
        console.log(
          `Process ${processes[i].id} Turnaround Time = ${totalBurst} - ${processes[i].arrival_time} = ${processes[i].turnaroundTime}`
        );
        console.log(
          `Process ${processes[i].id} Waiting Time = ${processes[i].turnaroundTime} - ${processes[i].burst} = ${processes[i].waitingTime}`
        );
      }
    }
    let avgWT = 0;
    let avgTAT = 0;

    for (let i = 0; i < processes.length; i++) {
      avgTAT += processes[i].turnaroundTime;

      avgWT += processes[i].waitingTime;
    }

    avgTAT = avgTAT / getUniqueProcesses(processes).length;
    setFinalAvgTAT(avgTAT);

    avgWT = avgWT / getUniqueProcesses(processes).length;
    setFinalAvgWT(avgWT);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  function getUniqueProcesses(processes) {
    const uniqueProcessesMap = new Map();

    processes.forEach((process) => {
      uniqueProcessesMap.set(process.id, process);
    });

    return Array.from(uniqueProcessesMap.values());
  }

  function findLastInstanceById(array, targetId) {
    let lastInstance = null;

    for (let i = array.length - 1; i >= 0; i--) {
      const current = array[i];
      if (current.id === targetId) {
        lastInstance = current;
        break;
      }
    }

    return lastInstance;
  }

  useEffect(() => {
    if (buttonPressed) {
      handleWaitingTime();
      handleINFO();
    }
  }, [waitingTimeArray, buttonPressed]);

  return (
    <>
      <div className="bg-slate-800 pt-5 min-h-screen max-h-full">
        <div className="w-1/2 flex mx-auto ">
          <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
              <div class="mb-6">
                <div class="grid grid-cols-4 gap-4">
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
                    Enter new process:
                  </label>
                  <input
                    type="text"
                    id="arrival_time"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Arrival Time"
                    value={arrival_time}
                    onChange={(e) => setArrival_time(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    id="processes"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                  />
                  <input
                    type="text"
                    id="processes"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Burst Time"
                    value={burst}
                    onChange={(e) => setBurst(e.target.value)}
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={handleReset}
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

            <div class="relative overflow-x-auto">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Process Name
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Arrival Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Priority
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Burst
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Turnaround Time
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Waiting Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {numOfProcesses > 1 &&
                    tableProcesses.map((process) => {
                      {
                        return (
                          <tr
                            key={process.id} // Ensure each element has a unique key
                            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                          >
                            <th
                              scope="row"
                              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              P{process.id}
                            </th>
                            <td class="px-6 py-4">{process.arrival_time}</td>
                            <td class="px-6 py-4">{process.priority}</td>
                            <td class="px-6 py-4">{process.burst}</td>

                            <td class="px-6 py-4">
                              {
                                findLastInstanceById(processes, process.id)
                                  .turnaroundTime
                              }
                            </td>
                            <td class="px-6 py-4">
                              {
                                findLastInstanceById(processes, process.id)
                                  .waitingTime
                              }
                            </td>
                          </tr>
                        );
                      }
                      return null; // Skip rendering for duplicate ids
                    })}

                  {numOfProcesses == 1 && (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <td
                        colSpan="6"
                        className="text-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        No Processes yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-5">
              <label
                for="countries"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select an algorithm
              </label>
              <select
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={algorithm}
                onChange={(e) => {
                  setAlgorithm(e.target.value);
                }}
              >
                <option selected>Choose an algorithm</option>
                <option value="FCFS">FCFS</option>
                <option value="SJF-P">SJF Preemptive</option>
                <option value="SJF-NP">SJF Non-Preemptive</option>
                <option value="RR">Round Robin</option>
                <option value="P-P">Priority Preemptive</option>
                <option value="P-NP">Priority Non-Preemptive</option>
              </select>
            </div>
            {algorithm === "RR" && (
              <div className="flex mt-5">
                <label
                  className="block mb-2 mr-3 text-sm font-medium text-gray-900 dark:text-white my-auto"
                  style={{ whiteSpace: "nowrap" }}
                >
                  Enter time quantum:
                </label>
                <input
                  type="text"
                  id="time_quantum"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Time Quantum"
                  value={RRTimeQuantum}
                  onChange={(e) => setRRTimeQuantum(e.target.value)}
                  required
                />
              </div>
            )}

            <div className="text-right mt-5">
              <button
                type="button"
                className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                onClick={() => {
                  handleAlgorithm();
                }}
              >
                Generate
              </button>
            </div>

            <div className="flex flex-row mt-10 h-10">
              {buttonPressed &&
                numOfProcesses > 1 &&
                processes.map((process, index) => {
                  return (
                    <div
                      className={`${
                        index % 2 == 0 ? "bg-slate-500" : "bg-slate-600"
                      }`}
                      style={{
                        width: `${(process.burst / burstSum()) * 100}%`,
                      }}
                    >
                      <p className="">P{process.id}</p>
                    </div>
                  );
                })}
            </div>
            {buttonPressed && <hr className="mt-5" />}
            <div className="flex flex-row h-10">
              {numOfProcesses > 1 &&
                buttonPressed &&
                waitingTimeArray.map((waitingTime, index) => {
                  const process = processes[index];

                  return (
                    <div
                      className="text-left text-white "
                      style={
                        index !== waitingTimeArray.length - 1
                          ? { width: `${(process.burst / burstSum()) * 100}%` }
                          : {}
                      }
                    >
                      {waitingTime}
                    </div>
                  );
                })}
            </div>

            {buttonPressed && (
              <div className="justify-start text-left">
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
                  Average Turnaround Time: {finalAvgTAT.toFixed(2)}
                </label>
                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white my-auto">
                  Average Waiting Time: {finalAvgWT.toFixed(2)}
                </label>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default OSForm;
