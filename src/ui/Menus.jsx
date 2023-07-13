import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;
const MenusContext = createContext();

const Menus = ({ children }) => {
  const [openId, setOpenId] = useState("");
  const [currentPosition, setCurrentPosition] = useState({});

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, open, close, currentPosition, setCurrentPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }) => {
  const { open, close, openId, setCurrentPosition } = useContext(MenusContext);

  const handleClick = (e) => {
    const position = e.target.closest("button").getBoundingClientRect();
    setCurrentPosition({
      x: window.innerWidth - position.width - position.x,
      y: 8 + position.height + position.y,
    });
    if (id === openId) {
      close();
    } else {
      open(id);
    }
  };
  return (
    <StyledToggle onClick={handleClick} className="toggle">
      <HiEllipsisVertical />
    </StyledToggle>
  );
};
const List = ({ id, children }) => {
  const { openId, currentPosition, close } = useContext(MenusContext);
  const ref = useOutsideClick(close);
  if (openId !== id) return null;
  return createPortal(
    <StyledList position={currentPosition} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
