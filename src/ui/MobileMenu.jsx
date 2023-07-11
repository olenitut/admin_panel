import { styled } from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

import { NavLink } from "react-router-dom";

import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineMap,
} from "react-icons/hi2";
import Button from "./Button";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    color: var(--color-grey-600);
    font-size: 2.6rem;
    font-weight: 500;
    padding: 1.6rem 2.8rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 3.4rem;
    height: 3.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

const StyledMobileMenu = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-grey-0);
  z-index: 1000;
`;

const MobileMenu = () => {
  const { isMenuOpen, toggleMenu } = useDarkMode();
  if (!isMenuOpen) return null;
  return (
    <StyledMobileMenu>
      <Button
        variation="secondary"
        onClick={toggleMenu}
        style={{ position: "absolute", right: "10px", top: "10px" }}
      >
        X
      </Button>
      <NavList>
        <li onClick={toggleMenu}>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li onClick={toggleMenu}>
          <StyledNavLink to="/bookings">
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li onClick={toggleMenu}>
          <StyledNavLink to="/cabins">
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>

        <li onClick={toggleMenu}>
          <StyledNavLink to="/settings">
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
        <li onClick={toggleMenu}>
          <StyledNavLink to="/map">
            <HiOutlineMap />
            <span>Cabins on Map</span>
          </StyledNavLink>
        </li>
      </NavList>
    </StyledMobileMenu>
  );
};
export default MobileMenu;
