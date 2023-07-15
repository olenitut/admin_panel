import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled),
  &.active {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media (max-width: 920px) {
    font-size: 0.8rem;
  }
`;

const Filter = ({ filters }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const curretnFilter = searchParams.get("filter") || filters[0].value;

  const handleClick = (val) => {
    searchParams.set("filter", val);
    // searchParams.set("page", 1);
    // debugger;
    setSearchParams(searchParams);
  };
  return (
    <StyledFilter>
      {filters.map((el) => (
        <FilterButton
          onClick={() => handleClick(el.value)}
          key={el.value}
          active={curretnFilter === el.value ? "active" : ""}
          disabled={curretnFilter === el.value}
        >
          {el.title}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};
export default Filter;
