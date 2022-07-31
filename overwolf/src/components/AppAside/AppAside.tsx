import { Aside, Stack } from "@mantine/core";
import { ReactNode } from "react";
import useStyles from "./AppAside.styles";

type Props = {
  children: ReactNode;
};
const AppAside = ({ children }: Props) => {
  const { classes } = useStyles();

  return (
    <Aside p="xs" width={{ xs: 421 }}>
      <Stack className={classes.stack} justify="space-between" spacing="xs">
        {children}
      </Stack>
    </Aside>
  );
};

export default AppAside;
