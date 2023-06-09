export type FileJson = {
  name: string;
  isFile?: boolean;
  children?: FileJson[];
};
export type FileInitializer = {
  id: number | undefined;
  name: string;
  isFile: boolean | undefined;
  parentId: number | undefined;
};
export type SortedFile = {
  id: number | undefined;
  name: string;
  isFile: boolean;
  parentId: number | undefined;
  depth: number;
};

export class File {
  id: number | undefined;
  name: string = "";
  isFile: boolean = false;
  parentId: number | undefined;

  constructor({ id, name, isFile = false, parentId }: FileInitializer) {
    if (id) this.id = id;
    if (name) this.name = name;
    this.isFile = isFile;
    this.parentId = parentId;
  }
}

export class FileSystem {
  files: File[] = [];
  biggestId: number = 0;
  eventHandlers: { [key: string]: () => void } = {};

  constructor(json: FileJson | undefined) {
    if (!json) return;

    const addChildren = (file: FileJson, parentId: number) => {
      if (!Array.isArray(file.children)) return;
      for (const child of file.children) {
        const id = this.addFile(
          new File({
            name: child.name,
            isFile: child.isFile,
            parentId: parentId,
          } as FileInitializer)
        );
        addChildren(child, id);
      }
    };

    const id = this.addFile(
      new File({
        name: json.name,
        isFile: json.isFile,
        parentId: 0,
      } as FileInitializer)
    );
    addChildren(json, id);
  }

  generateId(): number {
    return ++this.biggestId;
  }

  addFile(newFile: File): number {
    if (newFile.id) {
      const exists = Boolean(this.getFileById(newFile.id));
      if (exists) return 0;
      if (newFile.id > this.biggestId) this.biggestId = newFile.id;
    } else {
      newFile.id = this.generateId();
    }

    this.files.push(newFile);
    return newFile.id;
  }

  getFileById(id: number): File | undefined {
    return this.files.find((file) => file.id === id);
  }

  getFilesByParentId(parentId: number): File[] {
    return this.files.filter((file) => file.parentId === parentId);
  }

  getSortedFilesFromParentId(
    parentId: number,
    openedIds: number[]
  ): SortedFile[] {
    const result: SortedFile[] = [];
    const findChildren = (id: number, depth: number) => {
      const allFiles = this.getFilesByParentId(id);
      const dirs = allFiles.filter(({ isFile }) => !isFile);
      const files = allFiles.filter(({ isFile }) => isFile);
      for (const file of dirs) {
        result.push({ ...file, depth });
        if (openedIds.indexOf(file.id as number) !== -1)
          findChildren(file.id as number, depth + 1);
      }
      for (const file of files) {
        result.push({ ...file, depth });
      }
    };

    findChildren(parentId, 1);
    return result;
  }

  moveFile(srcId: number, destId: number) {
    if (srcId === destId) return;
    const destDir = this.getFileById(destId);
    if (destDir?.isFile) return;
    const srcFile = this.getFileById(srcId);
    if (!srcFile) return;
    srcFile.parentId = destId;
    this.trigger("move");
  }

  on(event: "delete" | "move", callback: () => void) {
    this.eventHandlers[event] = callback;
  }

  trigger(event: "delete" | "move" ) {
    this.eventHandlers[event]?.();
  }
}
