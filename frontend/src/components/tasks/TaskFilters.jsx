const TaskFilters = ({
    search,
    setSearch,
    status,
    setStatus,
    priority,
    setPriority,
}) => {
    return (
        <div className="filters">

            <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="">All Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

        </div>
    );
};

export default TaskFilters;