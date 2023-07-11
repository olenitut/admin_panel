import styled from "styled-components";
import { HiX } from "react-icons/hi";
import { createPortal } from "react-dom";
import { cloneElement, createContext, useContext, useState } from "react";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;

  @media (max-width: 920px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    padding: 1rem;
    display: flex;
    align-items: center;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

const Window = ({ children, name, isOpen }) => {
  const { close, openName } = useContext(ModalContext);
  if (name !== openName && !isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.currentTarget === e.target) {
      close();
    }
  };
  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <StyledModal>
        <Button onClick={close}>
          <HiX />
        </Button>

        <div>{cloneElement(children, { onClose: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
};

const Open = ({ children, opens }) => {
  const { open } = useContext(ModalContext);
  return <div>{cloneElement(children, { onClick: () => open(opens) })}</div>;
};

const Modal = ({ children, onClose }) => {
  const [openName, setOpenName] = useState("");
  const close = () => {
    setOpenName("");
    onClose?.();
  };
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ close, open, openName }}>
      {children}
    </ModalContext.Provider>
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
