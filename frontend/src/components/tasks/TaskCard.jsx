import { FiEdit, FiTrash2 } from "react-icons/fi";

const TaskCard = ({
    task,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="task-card">

            <div className="task-content">
                <h3>{task.title}</h3>

                <p>
                    {task.description || "No description"}
                </p>

                <div className="task-badges">
                    <span className={`badge ${task.status}`}>
                        {task.status}
                    </span>

                    <span className={`badge ${task.priority}`}>
                        {task.priority}
                    </span>
                </div>

                {task.dueDate && (
                    <small>
                        Due:{" "}
                        {new Date(task.dueDate).toLocaleDateString()}
                    </small>
                )}
            </div>

            <div className="task-actions">

                <button onClick={() => onEdit(task)}>
                    <FiEdit />
                    Edit
                </button>

                <button
                    className="danger-button"
                    onClick={() => onDelete(task)}
                >
                    <FiTrash2 />
                    Delete
                </button>

            </div>

        </div>
    );
};

export default TaskCard;