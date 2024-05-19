import '../css/Modal.css'

const ModalComponent = ({isOpen, onClose, children, titleM}) => {

    if (!isOpen) return null; 

    return (
        <div className="modal-body">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>Fechar</button>
                <div>
                    <text className='titulo-modal'>{titleM}</text>
                </div>
                {children}
            </div>
        </div>
    );
}

export default ModalComponent;