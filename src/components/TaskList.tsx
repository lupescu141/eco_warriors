import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Task = {
  task_id: number;
  title: string;
  description: string;
  points: number;
  level: string;
  completed: boolean;
  active: boolean;
};

type TaskProps = {
  task: Task;
};

const TaskList = ({ task }: TaskProps) => {
  // show task content
  const [displayContent, setDisplayContent] = useState(false);

  // complete task
  const [completed, setCompleted] = useState(task.completed);

  // set active ?
  const [active, setActive] = useState(task.active);

  // show task content when button is clicked
  const toggleTaskContent = () => {
    setDisplayContent(!displayContent);
  };

  // toggle task to completed
  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  // set task to active
  const toggleTaskToActive = () => {
    setActive(!active);
  };
  console.log("Aktiivinen: ", active);
  console.log("Tehty: ", completed);

  return (
    <>
      <div
        key={task.task_id}
        className={`task-container ${active ? "active" : ""}`}
      >
        <div className="task-header">
          <h3>{task.title}</h3>
          <button onClick={toggleTaskContent} className="toggle-content-btn">
            {displayContent ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </button>
        </div>

        <div className={`task-content-wrapper ${displayContent ? "open" : ""}`}>
          <div className="task-content">
            <p>{task.description}</p>
            <div className="lvl-pnts">
              <p>Level: {task.level}</p>
              <p>Points: {task.points}</p>
            </div>
            {/* task "active" */}
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="active-task"
                onChange={toggleTaskToActive}
                checked={active}
              />
              Select Task
            </label>
            {/* Completed task */}
            <p>Completed: {completed ? "Yes" : "No"}</p>
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="active-task"
                onChange={toggleCompleted}
                checked={completed}
              />
              Complete task
            </label>
            {completed && <button>Upload</button>}
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskList;
