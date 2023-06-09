export const MOCK_FILES = {
  name: "root",
  children: [
    {
      name: "node_modules",
      children: [
        {
          name: "react",
          children: [
            {
              name: "package.json",
              isFile: true,
            },
          ],
        },
        {
          name: "react-dom",
          children: [
            {
              name: "package.json",
              isFile: true,
            },
          ],
        },
        {
          name: "react-scripts",
          children: [
            {
              name: "package.json",
              isFile: true,
            },
          ],
        },
      ],
    },
    {
      name: "src",
      children: [
        {
          name: "index.tsx",
          isFile: true,
        },
        {
          name: "index.css",
          isFile: true,
        },
        {
          name: "components",
          children: [
            {
              name: "FileExplorer.tsx",
              isFile: true,
            },
          ],
        },
        {
          name: "data",
          children: [
            {
              name: "FileSystem.ts",
              isFile: true,
            },
            {
              name: "MockFiles.ts",
              isFile: true,
            },
          ],
        },
        {
          name: "utils",
        },
      ],
    },
    {
      name: "package.json",
      isFile: true,
    },
    {
      name: "package-lock.json",
      isFile: true,
    },
    {
      name: "tsconfig.json",
      isFile: true,
    },
    {
      name: "README.md",
      isFile: true,
    },
  ],
};
