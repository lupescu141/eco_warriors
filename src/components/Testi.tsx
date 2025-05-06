import "../styles/Task.css";
import { TaskWithUser } from "ecwtypes/EcoWDBTypes";
import { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadModal from "./UploadModal";

type testiProps = {
  item: TaskWithUser;
};

const Testi = (props: testiProps) => {
  const { item } = props;

  // show task content
  const [displayContent, setDisplayContent] = useState(false);

  // complete task
  const [completed, setCompleted] = useState(item.complete);

  // set active ?
  const [active, setActive] = useState(item.active);

  // show modal
  const [showModal, setShowModal] = useState(false);

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
  console.log("Show modal?", showModal);

  return (
    <>
      <div
        key={item.task_id}
        className={`task-container ${completed ? "completed" : active ? "active" : ""} `}
      >
        <div className="task-header">
          <h3>{item.task_title}</h3>
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
            <p>{item.task_description}</p>
            <div className="lvl-pnts">
              <p>Level: {item.level}</p>
              <p>Points: {item.points}</p>
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
            <label className="checkbox-container">
              <input
                type="checkbox"
                id="active-task"
                onChange={toggleCompleted}
                checked={completed}
              />
              Complete task
            </label>
            {completed && (
              <button onClick={() => setShowModal(true)}>Upload</button>
            )}
          </div>
        </div>
      </div>
      {showModal && <UploadModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Testi;
