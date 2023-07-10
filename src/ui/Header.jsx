import { styled } from "styled-components";
import DarkModeToggle from "./DarkModeToggle";
import MenuToggle from "./MenuToggle";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Header = () => {
  return (
    <StyledHeader>
      <p> Oasis | Admin Panel</p>
      <ButtonContainer>
        <DarkModeToggle />
        <MenuToggle />
      </ButtonContainer>
    </StyledHeader>
  );
};
export default Header;
