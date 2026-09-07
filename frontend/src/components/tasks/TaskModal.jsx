import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TaskModal = ({
    isOpen,
    task,
    onClose,
    onSave,
    isSaving,
}) => {
    const {
        register,
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            title: "",
            description: "",
            status: "pending",
            priority: "medium",
            dueDate: "",
        },
    });

    useEffect(() => {
        if (task) {
            reset({
                title: task.title || "",
                description: task.description || "",
                status: task.status || "pending",
                priority: task.priority || "medium",
                dueDate: task.dueDate
                    ? task.dueDate.substring(0, 10)
                    : "",
            });
        } else {
            reset({
                title: "",
                description: "",
                status: "pending",
                priority: "medium",
                dueDate: "",
            });
        }
    }, [task, reset]);

    if (!isOpen) {
        return null;
    }

    const submitForm = (data) => {
        onSave(data);
    };

    return (
        <div className="modal-overlay">
            <div className="task-modal">

                <h2>
                    {task ? "Edit Task" : "Add Task"}
                </h2>

                <form onSubmit={handleSubmit(submitForm)}>

                    <input
                        type="text"
                        placeholder="Task title"
                        {...register("title", {
                            required: true,
                        })}
                    />

                    <textarea
                        placeholder="Description"
                        {...register("description")}
                    />

                    <select {...register("status")}>
                        <option value="pending">
                            Pending
                        </option>

                        <option value="in-progress">
                            In Progress
                        </option>

                        <option value="completed">
                            Completed
                        </option>
                    </select>

                    <select {...register("priority")}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    <input
                        type="date"
                        {...register("dueDate")}
                    />

                    <div className="modal-actions">

                        <button
                            type="button"
                            onClick={onClose}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSaving}
                        >
                            {isSaving ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
};

export default TaskModal;