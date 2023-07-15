import { useEffect } from "react";
import { useState } from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

const StyledPaginator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 920px) {
    font-size: 1.1rem;
  }
`;

const PaginatorElement = styled.div`
  padding: 4px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);

  & .disabled {
    color: var(--color-grey-400);
    cursor: not-allowed;
  }

  &.active {
    background-color: var(--color-indigo-100);
  }

  @media (max-width: 920px) {
    padding: 3px 7px;
  }
`;

const Paginator = ({ length, itemsPerPage }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [initialRender, setInitialRender] = useState(true);

  const page = Number(searchParams.get("page"));

  const [curPage, setCurPage] = useState(page || 1);
  const numPages = Math.ceil(length / itemsPerPage);

  useEffect(() => {
    searchParams.set("page", curPage);
    setSearchParams(searchParams);
  }, [curPage, searchParams, setSearchParams]);

  useEffect(() => {
    if (initialRender) {
      setInitialRender(false);
    } else {
      setCurPage(1);
    }
  }, [length]);

  const handleBack = () => {
    if (curPage > 1) {
      setCurPage((prev) => prev - 1);
    }
  };
  const handleForward = () => {
    if (curPage < numPages) {
      setCurPage((prev) => prev + 1);
    }
  };

  const pagesArr = Array.from({ length: numPages }, (_, i) => i + 1);

  let pagesRender;

  if (pagesArr.length < 6) {
    pagesRender = pagesArr.map((el) => (
      <PaginatorElement
        key={el}
        value={el}
        onClick={() => setCurPage(el)}
        className={curPage === el ? "active" : ""}
      >
        {el}
      </PaginatorElement>
    ));
  }

  if (numPages >= 6 && curPage < 3) {
    pagesRender = (
      <>
        {Array.from({ length: 3 }, (_, i) => i + 1).map((el) => (
          <PaginatorElement
            key={el}
            value={el}
            onClick={() => setCurPage(el)}
            className={curPage === el ? "active" : ""}
          >
            {el}
          </PaginatorElement>
        ))}
        <PaginatorElement>...</PaginatorElement>
        <PaginatorElement
          key={numPages}
          value={numPages}
          onClick={() => setCurPage(numPages)}
          className={curPage === numPages ? "active" : ""}
        >
          {numPages}
        </PaginatorElement>
      </>
    );
  }

  if (numPages >= 6 && curPage >= 3 && curPage < numPages - 2) {
    pagesRender = (
      <>
        <PaginatorElement
          key={1}
          value={1}
          onClick={() => setCurPage(1)}
          className={curPage === 1 ? "active" : ""}
        >
          {1}
        </PaginatorElement>
        <PaginatorElement>...</PaginatorElement>
        {Array.from({ length: 3 }, (_, i) => i + curPage - 1).map((el) => (
          <PaginatorElement
            key={el}
            value={el}
            onClick={() => setCurPage(el)}
            className={curPage === el ? "active" : ""}
          >
            {el}
          </PaginatorElement>
        ))}
        <PaginatorElement>...</PaginatorElement>
        <PaginatorElement
          key={numPages}
          value={numPages}
          onClick={() => setCurPage(numPages)}
          className={curPage === numPages ? "active" : ""}
        >
          {numPages}
        </PaginatorElement>
      </>
    );
  }

  if (numPages >= 6 && curPage >= 3 && curPage >= numPages - 2) {
    pagesRender = (
      <>
        <PaginatorElement
          key={1}
          value={1}
          onClick={() => setCurPage(1)}
          className={curPage === 1 ? "active" : ""}
        >
          {1}
        </PaginatorElement>
        <PaginatorElement>...</PaginatorElement>
        {[numPages - 3, numPages - 2, numPages - 1, numPages].map((el) => (
          <PaginatorElement
            key={el}
            value={el}
            onClick={() => setCurPage(el)}
            className={curPage === el ? "active" : ""}
          >
            {el}
          </PaginatorElement>
        ))}
      </>
    );
  }

  return (
    <StyledPaginator>
      <PaginatorElement>
        <HiChevronDoubleLeft
          onClick={handleBack}
          className={curPage === 1 ? "disabled" : ""}
        />
      </PaginatorElement>
      {pagesRender}
      <PaginatorElement>
        <HiChevronDoubleRight
          onClick={handleForward}
          className={curPage === numPages ? "disabled" : ""}
        />
      </PaginatorElement>
    </StyledPaginator>
  );
};
export default Paginator;
