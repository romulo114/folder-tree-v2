import React from "react";
import FileExplorer from "../src/components/FileExplorer";
import { FileJson } from "../src/utils/FileSystem";
import { MOCK_FILES } from "../src/data/MockFiles";
import { FileSystem } from "../src/utils/FileSystem";

function App() {
  const fileSystem: FileSystem = new FileSystem(MOCK_FILES as FileJson);
  return <FileExplorer fileSystem={fileSystem} rootId={1} />;
}

export default App;
