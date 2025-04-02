import './ConfirmModal.css'

const ConfirmModal = ({ isOpen, onClose, onConfirm, taskTitle }) => {
    if (!isOpen) return null

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content">
                <h2>Вы уверены, что хотите удалить задачу "{taskTitle}"?</h2>
                <div >
                    <button onClick={onConfirm} className="modal-button">Удалить</button>
                    <button onClick={onClose} className="modal-close">Отмена</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal