import styled from "styled-components";
import { colors } from "../utils/colors";
import {
  VscFolder,
  VscFolderOpened,
  VscSymbolFile,
  VscChevronRight,
  VscChevronDown,
} from "react-icons/vsc";

function SingleFile({
  id,
  name,
  depth,
  isFile,
  isOpen,
  selected,
  highlighted,
  onClick,
  onDragStart,
  onDragOver,
  onDrop,
}: {
  id: number;
  name: string;
  depth: number;
  isFile: boolean;
  isOpen: boolean;
  selected: boolean;
  highlighted: boolean;
  onClick: (id: number) => void;
  onDragStart: (id: number, event: React.DragEvent) => void;
  onDragOver: (id: number, event: React.DragEvent) => void;
  onDrop: (id: number, event: React.DragEvent) => void;
}) {
  return (
    <Wrapper
      depth={depth}
      selected={selected}
      highlighted={highlighted}
      onClick={() => onClick(id)}
      draggable={true}
      onDragStart={(event) => onDragStart(id, event)}
      onDragOver={(event) => onDragOver(id, event)}
      onDrop={(event) => onDrop(id, event)}
      aria-label={`${name}-file-row`}
    >
      {isFile && <VscSymbolFile color={colors.light1} />}
      {!isFile && isOpen && (
        <>
          <ArrowWrapper depth={depth}>
            <VscChevronDown color={colors.light1} />
          </ArrowWrapper>
          <VscFolderOpened color={colors.light1} />
        </>
      )}
      {!isFile && !isOpen && (
        <>
          <ArrowWrapper depth={depth}>
            <VscChevronRight color={colors.light1} />
          </ArrowWrapper>
          <VscFolder color={colors.light1} />
        </>
      )}
      <Paragraph>{name}</Paragraph>
    </Wrapper>
  );
}

const Wrapper = styled.div<{
  depth: number;
  selected: boolean;
  highlighted: boolean;
}>`
  position: relative;
  display: flex;
  align-items: center;
  gap: 7px;
  padding-left: ${(props: any) => 12 + 10 * props.depth + "px"};
  cursor: pointer;
  background-color: ${(props: any) =>
    props.selected ? colors.dark3 : props.highlighted ? colors.dark2 : "transparent"};
  &:hover {
    background-color: ${(props: any) =>
      props.selected ? colors.dark3 : colors.dark2};
  }
`;
const ArrowWrapper = styled.div<{ depth: number }>`
  position: absolute;
  top: 0px;
  left: ${(props: any) => -6 + 10 * props.depth + "px"};
  height: 100%;
  display: flex;
  align-items: center;
`;
const Paragraph = styled.p`
  color: ${colors.light2};
  line-height: 1.7;
  margin: 0px;
  padding: 0px;
`;

export default SingleFile;
