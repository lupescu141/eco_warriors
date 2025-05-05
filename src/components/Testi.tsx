import "../styles/Task.css";
import { Tasks } from "ecwtypes/EcoWDBTypes";
import { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type testiProps = {
  item: Tasks;
};

const Testi = (props: testiProps) => {
  const { item } = props;

  // show task content
  const [displayContent, setDisplayContent] = useState(false);

  // show task content when button is clicked
  const toggleTaskContent = () => {
    setDisplayContent(!displayContent);
  };

  return (
    <>
      <div>
        <div key={item.task_id} className="task-container">
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
          <div
            className={`task-content-wrapper ${displayContent ? "open" : ""}`}
          >
            <div className="task-content">
              <p>{item.task_description}</p>
              <div className="lvl-pnts">
                <p>Level: {item.level}</p>
                <p>Points: {item.points}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testi;
