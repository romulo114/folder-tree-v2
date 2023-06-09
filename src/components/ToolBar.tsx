import styled from "styled-components";
import { colors } from "../utils/colors";
import {
  VscNewFile,
  VscNewFolder,
  VscCollapseAll,
  VscRefresh,
} from "react-icons/vsc";

function ToolBar({ title }: { title: string | undefined }) {
  return (
    <Wrapper aria-label="toolbar">
      <Paragraph aria-label="root-name">{title}</Paragraph>
      <VscNewFile style={{marginLeft: 'auto'}} color={colors.light1} size={20} cursor="pointer" />
      <VscNewFolder color={colors.light1} size={20} cursor="pointer" />
      <VscRefresh color={colors.light1} size={20} cursor="pointer" />
      <VscCollapseAll color={colors.light1} size={20} cursor="pointer" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px;
`;

const Paragraph = styled.p`
  color: ${colors.light2};
  line-height: 1.7;
  margin: 0px;
  padding: 0px;
  text-transform: uppercase;
`;

export default ToolBar;
