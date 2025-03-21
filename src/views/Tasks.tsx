import TaskList from "../components/TaskList";
import "../styles/Task.css";

// MOCKDTA

const tasks: Task[] = [
  {
    task_id: 1,
    title: "Sort and Recycle Household Waste",
    description:
      "Separate organic waste, plastics, metals, glass, and cardboard into their respective recycling bins.",
    points: 10,
    level: "Easy",
    completed: false,
    active: false,
  },
  {
    task_id: 2,
    title: "Reduce Electricity Consumption for a Day",
    description:
      "Turn off unnecessary lights, unplug unused devices, and maximize the use of natural light.",
    points: 15,
    level: "Medium",
    completed: false,
    active: false,
  },
  {
    task_id: 3,
    title: "Participate in a Local Cleanup",
    description:
      "Go outside and collect at least 10 pieces of litter from the environment. You can do this alone or with a friend.",
    points: 20,
    level: "Hard",
    completed: true,
    active: false,
  },
];
type Task = {
  task_id: number;
  title: string;
  description: string;
  points: number;
  level: string;
  completed: boolean;
  active: boolean;
};

// Tehtävien näkymä

const Tasks = () => {
  return (
    <>
      <div className="task-header-container">
        <h1>Monthly Checklist</h1>
      </div>
      <hr style={{ width: "90vw", margin: "auto" }} />
      <div className="tasks">
        {tasks.map((task) => (
          <TaskList key={task.task_id} task={task} />
        ))}
      </div>
    </>
  );
};

export default Tasks;
