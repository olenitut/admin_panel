import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

const StyledSearch = styled.input`
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

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [serachStr, setSearchStr] = useState("");
  const handleChange = (e) => {
    const userSearch = e.target.value.trim().toLowerCase();
    searchParams.set("search", userSearch);
    if (!userSearch) {
      searchParams.delete("search");
    } else {
      searchParams.set("search", userSearch);
    }
    setSearchParams(searchParams);
    setSearchStr(userSearch);
  };
  return (
    <StyledSearch
      type="text"
      onChange={handleChange}
      value={serachStr}
      placeholder="Search..."
    />
  );
};
export default Search;
