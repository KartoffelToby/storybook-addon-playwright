
export type StoryData = {
  id: string;
  name: string;
  kind: string;
  children: string[];
  parameters: {
    fileName: string;
    options: {
      showRoots?: boolean;
      [key: string]: unknown | undefined;
    };
    [parameterName: string]: unknown;
  };
  isLeaf: boolean;
  parent: string;
};
