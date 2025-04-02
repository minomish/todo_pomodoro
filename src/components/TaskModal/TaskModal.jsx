import { useState, useEffect } from 'react';
import './TaskModal.css';

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (isOpen) {  // Добавляем проверку, чтобы корректно сбрасывать форму
            if (task) {
                setTitle(task.title || '');
                setDescription(task.description || '');
                setDeadline(task.deadline || '');
            } else {
                setTitle('');
                setDescription('');
                setDeadline('');
            }
            setError(false);
        }
    }, [task, isOpen]); // Теперь useEffect будет срабатывать при каждом открытии модалки

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError(true);
            return;
        }

        onSave({ ...task, title, description, deadline });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{task ? 'Редактировать задачу' : 'Новая задача'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Заголовок"
                        className={`modal-input ${error ? 'error' : ''}`}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">Заголовок не может быть пустым</p>}
                    <textarea
                        placeholder="Описание"
                        className="modal-input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="date"
                        className="modal-input"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit" className="modal-button">Сохранить</button>
                        <button type="button" className="modal-close" onClick={onClose}>Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
