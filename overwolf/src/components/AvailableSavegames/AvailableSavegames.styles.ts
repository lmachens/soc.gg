import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  listItem: {
    backgroundColor: theme.colors.dark[8],
    cursor: "pointer",
  },
  selected: {
    backgroundColor: theme.fn.rgba(theme.colors[theme.primaryColor][7], 0.45),
  },
}));
