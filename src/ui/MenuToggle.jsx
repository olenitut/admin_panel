import { HiOutlineMenu } from "react-icons/hi";
import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "./ButtonIcon";
import { styled } from "styled-components";

const StyledMenuToggle = styled.div`
  display: none;
  @media (max-width: 920px) {
    display: block;
  }
`;

const MenuToggle = () => {
  const { toggleMenu } = useDarkMode();
  return (
    <StyledMenuToggle>
      <ButtonIcon onClick={toggleMenu}>
        <HiOutlineMenu />
      </ButtonIcon>
    </StyledMenuToggle>
  );
};
export default MenuToggle;
