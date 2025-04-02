import TaskCard from '../TaskCard/TaskCard'
import './TaskColumn.css'

const TaskColumn = ({ title, tasks, onChangeState, onEdit, onDelete, backgroundColor }) => {
    return (
        <div className="task-column" style={{ backgroundColor }}>
            <h3>{title}</h3>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} onChangeState={onChangeState} />
            ))}
        </div>
    )
}

export default TaskColumn