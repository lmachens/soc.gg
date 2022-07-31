export type File = {
  name: string;
  path: string;
};
export async function listFolder(
  folderPath: string,
  recursive = true,
  filterType?: string
) {
  const files = await new Promise<File[]>((resolve, reject) => {
    overwolf.io.dir(folderPath, async (result) => {
      if (typeof result.data === "undefined") {
        reject(result.error);
      } else {
        const files = result.data
          .filter(
            (fileOrFolder) =>
              fileOrFolder.type === "file" &&
              (filterType ? fileOrFolder.name.endsWith(filterType) : true)
          )
          .map((file) => ({
            name: file.name,
            path: `${folderPath}\\${file.name}`,
          }));

        if (recursive) {
          for (const fileOrFolder of result.data) {
            if (fileOrFolder.type === "dir") {
              const moreFiles = await listFolder(
                `${folderPath}\\${fileOrFolder.name}`,
                recursive,
                filterType
              );
              files.push(...moreFiles);
            }
          }
        }
        resolve(files);
      }
    });
  });
  return files;
}

export async function readFile(filePath: string) {
  const content = await new Promise<string>((resolve, reject) => {
    overwolf.io.readFileContents(
      filePath,
      overwolf.io.enums.eEncoding.UTF8,
      (result) => {
        if (typeof result.content === "undefined") {
          reject(result.error);
        } else {
          resolve(result.content);
        }
      }
    );
  });
  return content;
}

export async function writeFile(filePath: string, content: string) {
  await new Promise((resolve, reject) => {
    overwolf.io.writeFileContents(
      filePath,
      content,
      overwolf.io.enums.eEncoding.UTF8,
      true,
      (result) =>
        result.success ? resolve(result.success) : reject(result.error)
    );
  });
}
