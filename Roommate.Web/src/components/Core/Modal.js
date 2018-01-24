import React from 'react';

const Modal = ({modalId, header, closeModal, children}) => (
    <div className="modal" id={modalId}>
        <div className="modal__content">
            <div className="close" onClick={closeModal}>&times;</div>
            <div className="modal__header">{header}</div>
            {children}
        </div>
    </div>
);

export default Modal;