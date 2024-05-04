# Gantt Chart Visualizer

A Gantt chart stands as a practical cornerstone in project management, offering a
straightforward visual representation of task schedules over time. When delving into CPU scheduling
algorithms, the Gantt chart assumes a pivotal role in elucidating the execution timeline of processes.
Algorithms, such as the commonly used Round Robin or Shortest Job First, dictate the order in which
processes are granted CPU time.
This visual tool, in the form of a Gantt chart, simplifies the complex task of understanding the
scheduling intricacies, facilitating an easy-to-interpret display. It becomes an invaluable aid in analyzing
resource utilization, turnaround times, and the overall efficiency of a computing system. In the
development of our web application, ReactJS was employed—a web app framework utilizing JavaScript,
HTML, and CSS. Additionally, TailWindCSS was leveraged to enhance and streamline the application's
styling.

Navigating through our web app is designed to be user-friendly and intuitive. Users input
individual processes, including arrival time, priority, and burst time, which are then displayed in a
comprehensive table. Once all processes are entered, users can select a scheduling algorithm and click
"Generate" to witness the Gantt chart dynamically organized by the chosen algorithm. Additionally, the
average turnaround time and waiting time are presented below the Gantt chart, providing a
comprehensive overview of the scheduled processes.

An interactive demo can be viewed [here](https://gcv-eight.vercel.app/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
