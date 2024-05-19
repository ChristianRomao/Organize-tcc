import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/Modal.css'
import { faX } from '@fortawesome/free-solid-svg-icons';

const ModalComponent = ({isOpen, onClose, children, titleM}) => {

    if (!isOpen) return null; 

    return (
        <div className="modal-body">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}><FontAwesomeIcon icon={faX} size='1.2x'/></button>
                <div>
                    <text className='titulo-modal'>{titleM}</text>
                </div>
                {children}
            </div>
        </div>
    );
}

export default ModalComponent;