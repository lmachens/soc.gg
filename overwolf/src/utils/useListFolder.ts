import { useEffect, useState } from "react";
import { File, listFolder } from "./io";

function useListFolder(folderPath: string): [File[] | null, () => void] {
  const [filesAndFolders, setFilesAndFolders] = useState<File[] | null>(null);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderPath]);

  const refresh = () => {
    listFolder(folderPath, true, ".sav").then(setFilesAndFolders);
  };
  return [filesAndFolders, refresh];
}

export default useListFolder;
