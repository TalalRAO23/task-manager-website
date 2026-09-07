import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask,
} from "../api/taskApi";

import TaskFilters from "../components/tasks/TaskFilters";
import TaskList from "../components/tasks/TaskList";
import TaskModal from "../components/tasks/TaskModal";
import ConfirmDialog from "../components/common/ConfirmDialog";

const Home = () => {
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [priority, setPriority] = useState("");

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState(null);

    // Get tasks
    const {
        data: tasks = [],
        isLoading,
    } = useQuery({
        queryKey: ["tasks", search, status, priority],
        queryFn: () =>
            getTasks({
                search,
                status,
                priority,
            }),
    });

    // Create task
    const createMutation = useMutation({
        mutationFn: createTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            setIsModalOpen(false);

            toast.success("Task created");
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to create task"
            );
        },
    });

    // Update task
    const updateMutation = useMutation({
        mutationFn: updateTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            setIsModalOpen(false);
            setSelectedTask(null);

            toast.success("Task updated");
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to update task"
            );
        },
    });

    // Delete task
    const deleteMutation = useMutation({
        mutationFn: deleteTask,

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"],
            });

            setIsDeleteOpen(false);
            setTaskToDelete(null);

            toast.success("Task deleted");
        },

        onError: (error) => {
            toast.error(
                error.response?.data?.message ||
                "Failed to delete task"
            );
        },
    });

    const openAddModal = () => {
        setSelectedTask(null);
        setIsModalOpen(true);
    };

    const openEditModal = (task) => {
        setSelectedTask(task);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTask(null);
    };

    const handleSave = (data) => {
        if (selectedTask) {
            updateMutation.mutate({
                id: selectedTask._id,
                data,
            });
        } else {
            createMutation.mutate(data);
        }
    };

    const openDeleteDialog = (task) => {
        setTaskToDelete(task);
        setIsDeleteOpen(true);
    };

    const confirmDelete = () => {
        deleteMutation.mutate(taskToDelete._id);
    };

    return (
        <div className="home-page">

            <div className="home-header">

                <div>
                    <h1>My Tasks</h1>
                    <p>Manage your tasks easily.</p>
                </div>

                <button onClick={openAddModal}>
                    + Add Task
                </button>

            </div>

            <TaskFilters
                search={search}
                setSearch={setSearch}
                status={status}
                setStatus={setStatus}
                priority={priority}
                setPriority={setPriority}
            />

            <TaskList
                tasks={tasks}
                isLoading={isLoading}
                onEdit={openEditModal}
                onDelete={openDeleteDialog}
            />

            <TaskModal
                isOpen={isModalOpen}
                task={selectedTask}
                onClose={closeModal}
                onSave={handleSave}
                isSaving={
                    createMutation.isPending ||
                    updateMutation.isPending
                }
            />

            <ConfirmDialog
                isOpen={isDeleteOpen}
                message="Are you sure you want to delete this task?"
                onConfirm={confirmDelete}
                onCancel={() => {
                    setIsDeleteOpen(false);
                    setTaskToDelete(null);
                }}
            />

        </div>
    );
};

export default Home;