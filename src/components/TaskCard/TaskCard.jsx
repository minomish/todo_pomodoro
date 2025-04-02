import Button from '../Button/Button';
import './TaskCard.css';

const TaskCard = ({ task, onEdit, onDelete, onChangeState }) => {
    const isOverdue = new Date(task.deadline) < new Date() && task.state !== 'ВЫПОЛНЕНА';

    return (
        <div className="task-card" style={{ backgroundColor: isOverdue ? '#FE4B4B' : '#ffc107' } }>
            <div className="task-header">
                <h4>{task.title}</h4>
                <button className="delete-btn" onClick={() => onDelete(task)}>x</button>
            </div>
            <p className="description">{task.description}</p>
            <p className="deadline">Дедлайн: {task.deadline}</p>

            <div className="task-actions">
                <Button onClick={() => onChangeState(task.id, task.state === 'ВЫПОЛНЕННЫЕ' ? 'В РАБОТЕ' : 'ПОСТАВЛЕННЫЕ')} disabled={task.state === 'ПОСТАВЛЕННЫЕ'}>&lt;</Button>
                <Button onClick={() => onEdit(task)}>Редактировать</Button>
                <Button onClick={() => onChangeState(task.id, task.state === 'ПОСТАВЛЕННЫЕ' ? 'В РАБОТЕ' : 'ВЫПОЛНЕННЫЕ')} disabled={task.state === 'ВЫПОЛНЕННЫЕ'}>&gt;</Button>
            </div>
        </div>
    );
};

export default TaskCard;
