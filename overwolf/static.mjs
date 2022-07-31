import fs from "node:fs/promises";

await fs.cp("./manifest.json", "./dist/manifest.json");
await fs.cp("./icons/", "./dist/icons/", { recursive: true });
