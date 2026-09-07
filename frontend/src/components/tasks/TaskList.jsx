import TaskCard from "./TaskCard";
import Loader from "../common/Loader";

const TaskList = ({
    tasks,
    isLoading,
    onEdit,
    onDelete,
}) => {
    if (isLoading) {
        return <Loader />;
    }

    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                No tasks found.
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default TaskList;