import './DeleteItemModal.css'
import button from '../../images/close-btn.svg'

function DeleteItemModal({ isOpen, onClose, onDeleteModalSubmit }) {

    return (
        <div className={`modal ${isOpen && 'modal__opened'}`}>
            <div className="modal__content modal__content-type-delete">
                <p className="modal__warning">Are you sure you want to delete this item?</p>
                <p className="modal__warning">This action is irreversible.</p>
                <button onClick={onClose} type="button" className="modal__close">
                    <img src={button} alt="Close button" />
                </button>

                <form onSubmit={onDeleteModalSubmit} className="modal__form-delete">
                    <button type='submit' className="modal__submit-confirm-delete">Yes, delete item</button>
                    <button type='button' onClick={onClose} className="modal__submit-cancel-delete">Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default DeleteItemModal