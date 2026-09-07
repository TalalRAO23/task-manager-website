const ConfirmDialog = ({
    isOpen,
    message,
    onConfirm,
    onCancel,
}) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="confirm-dialog">
                <h3>Confirm</h3>

                <p>{message}</p>

                <div className="modal-actions">
                    <button onClick={onCancel}>
                        Cancel
                    </button>

                    <button
                        className="danger-button"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;