import { styled } from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

const StyledTooltipContainer = styled.div`
  position: relative;
  width: max-content;
`;

const StyledTooltipButton = styled.div`
  position: absolute;
  top: -5px;
  right: -15px;
  @media (max-width: 920px) {
    display: none;
  }
`;

const Tooltip = ({ type = "help", text, children }) => {
  return (
    <StyledTooltipContainer>
      {children}
      <StyledTooltipButton>
        <div>
          <HiOutlineQuestionMarkCircle id={type} />
        </div>
        <ReactTooltip
          anchorId={type}
          place="right"
          variant="info"
          content={text}
        />
      </StyledTooltipButton>
    </StyledTooltipContainer>
  );
};
export default Tooltip;
