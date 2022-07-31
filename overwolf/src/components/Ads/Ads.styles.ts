import { createStyles } from "@mantine/core";

export default createStyles((theme) => ({
  container: {
    height: 300,
    width: 400,
    backgroundColor: theme.colors.dark[8],
    position: "relative",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },
  ads: {
    position: "absolute",
    zIndex: 1,
    inset: 0,
  },
  text: {
    position: "absolute",
    zIndex: 0,
  },
}));
