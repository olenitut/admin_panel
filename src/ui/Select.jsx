import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

export const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  @media (max-width: 920px) {
    font-size: 0.8rem;
  }
`;

const Select = ({ options }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const val = searchParams.get("sort");
  const handleSort = (e) => {
    searchParams.set("sort", e.target.value);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (!val) {
      searchParams.set("sort", options[0].value);
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <StyledSelect onChange={handleSort} value={val || ""}>
      {options.map((el) => (
        <option value={el.value} key={el.value}>
          {el.title}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
