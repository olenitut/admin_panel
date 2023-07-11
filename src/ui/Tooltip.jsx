import { styled } from "styled-components";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";

const StyledTooltipButton = styled.div`
  position: absolute;
  top: -5px;
  right: -15px;
  @media (max-width: 920px) {
    display: none;
  }
`;

const TooltipButton = ({ type = "help", text }) => {
  return (
    <StyledTooltipButton>
      <div>
        <HiOutlineQuestionMarkCircle id={type} />
      </div>
      <Tooltip anchorId={type} place="right" variant="info" content={text} />
    </StyledTooltipButton>
  );
};
export default TooltipButton;
