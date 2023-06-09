import { useState, useEffect } from "react";
import styled from "styled-components";
import SingleFile from "./SingleFile";
import { colors } from "../utils/colors";
import { FileSystem, SortedFile } from "../utils/FileSystem";
import ToolBar from "./ToolBar";

function FileExplorer({
  fileSystem,
  rootId,
}: {
  fileSystem: FileSystem;
  rootId: number;
}) {
  const [openedIds, setOpenedIds] = useState<number[]>([rootId]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortedFiles, setSortedFiles] = useState<SortedFile[]>([]);
  const [dragOverFileId, setDragOverFileId] = useState<number>(-1);

  useEffect(() => {
    setSortedFiles(fileSystem.getSortedFilesFromParentId(rootId, openedIds));
    fileSystem.on("move", () => {
      setSortedFiles(fileSystem.getSortedFilesFromParentId(rootId, openedIds));
    });
  }, [fileSystem, rootId, openedIds]);

  const handleClick = (id: number) => {
    const file = fileSystem.getFileById(id);
    if (!file) return;

    setSelectedIds([file.id as number]);

    if (file.isFile) return;

    const curIndex = openedIds.indexOf(id);
    const alreadyOpened = curIndex !== -1;
    if (alreadyOpened) {
      setOpenedIds([
        ...openedIds.slice(0, curIndex),
        ...openedIds.slice(curIndex + 1),
      ]);
    } else {
      setOpenedIds([...openedIds, id]);
    }
  };

  const handleDragStart = (id: number, event: React.DragEvent) => {
    event.dataTransfer.setData("id", "" + id);
  };

  const handleDragOver = (id: number, event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setDragOverFileId(id);
  };

  const handleDrop = (dropId: number, event: React.DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const dragId = Number(event.dataTransfer.getData("id"));
    fileSystem.moveFile(dragId, dropId);
    setDragOverFileId(-1);
  };

  return (
    <Wrapper
      onDrop={(event: React.DragEvent) => handleDrop(rootId, event)}
      onDragOver={(event: React.DragEvent) => handleDragOver(rootId, event)}
    >
      <ToolBar title={fileSystem.getFileById(rootId)?.name} />
      {sortedFiles.map((file) => {
        return (
          <SingleFile
            key={file.id}
            id={file.id as number}
            name={file.name}
            depth={file.depth}
            isFile={file.isFile}
            isOpen={openedIds.indexOf(file.id as number) !== -1}
            selected={selectedIds.indexOf(file.id as number) !== -1}
            highlighted={dragOverFileId === file.id}
            onClick={handleClick}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${colors.dark1};
  max-width: 500px;
  height: 100vh;
  overflow-y: auto;
`;

export default FileExplorer;
