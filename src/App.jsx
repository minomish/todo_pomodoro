import { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import Pomodoro from './components/Pomodoro/Pomodoro';
import TaskColumn from './components/TaskColumn/TaskColumn';
import TaskModal from './components/TaskModal/TaskModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';

import './App.css';

const LOCAL_STORAGE_KEY = 'taskManagerTasks';

function App() {
    const [tasks, setTasks] = useState(() => {
        const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedTasks ? JSON.parse(storedTasks) : [];
    });

    const [modalTask, setModalTask] = useState(null);
    const [confirmTask, setConfirmTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        setModalTask(null); 
        setIsModalOpen(true);
    };    

    const handleSaveTask = (task) => {
        if (task.id) {
            setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
        } else {
            setTasks([...tasks, { ...task, id: Date.now(), state: 'ПОСТАВЛЕННЫЕ' }]);
        }
        setIsModalOpen(false);
    };

    const handleDeleteTask = (id) => {
        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.filter((task) => task.id !== id);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTasks)); 
            return updatedTasks;
        });
    };
    

    const handleChangeState = (id, newState) => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, state: newState } : task)));
        console.log('click change')
    };

    const filteredTasks = tasks.filter(task => {
        const taskDate = new Date(task.deadline).getTime();
        const start = startDate ? new Date(startDate).getTime() : null;
        const end = endDate ? new Date(endDate).getTime() : null;
        return (!start || taskDate >= start) && (!end || taskDate <= end);
    });

    return (
        <>
            <Header />
            <div className='main-content'>
                <Pomodoro />
                <div className='todo-container'>
                    <header>
                        <button className='todo-btn' onClick={handleAddTask}>НОВАЯ ЗАДАЧА</button>
                        <div className="filter">
                            <div className='filter_data'>
                            Фильтр:
                            <input className='modal-input' type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} /></div>
                            <div className='filter_data'>
                            по:
                            <input className='modal-input' type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} /></div>
                            <button className='todo-btn' onClick={() => { setStartDate(''); setEndDate(''); }}>СБРОСИТЬ ФИЛЬТРЫ</button>
                        </div>
                    </header>
                    <div className="task-columns">
                        <TaskColumn title="ПОСТАВЛЕННЫЕ" tasks={filteredTasks.filter((task) => task.state === 'ПОСТАВЛЕННЫЕ')} onChangeState={handleChangeState} onEdit={(task) => { setModalTask(task); setIsModalOpen(true); }} onDelete={(task) => { setConfirmTask(task); setIsConfirmOpen(true); }} />
                        <TaskColumn title="В РАБОТЕ" tasks={filteredTasks.filter((task) => task.state === 'В РАБОТЕ')} onChangeState={handleChangeState} onEdit={(task) => { setModalTask(task); setIsModalOpen(true); }} onDelete={(task) => { setConfirmTask(task); setIsConfirmOpen(true); }} />
                        <TaskColumn title="ВЫПОЛНЕННЫЕ" tasks={filteredTasks.filter((task) => task.state === 'ВЫПОЛНЕННЫЕ')} onChangeState={handleChangeState} onEdit={(task) => { setModalTask(task); setIsModalOpen(true); }} onDelete={(task) => { setConfirmTask(task); setIsConfirmOpen(true); }} />
                    </div>
                    <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveTask} task={modalTask} />
                    <ConfirmModal
                        isOpen={isConfirmOpen}
                        onClose={() => setIsConfirmOpen(false)}
                        onConfirm={() => {
                            if (confirmTask) {
                                handleDeleteTask(confirmTask.id);
                                setIsConfirmOpen(false);
                            }
                        }}
                        taskTitle={confirmTask?.title}
                    />
                </div>
            </div>
        </>
    );
}

export default App;
