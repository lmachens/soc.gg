import { AppShell, Box, Container } from "@mantine/core";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { CollectionLink } from "../../lib/staticProps";
import AppHeader from "../AppHeader/AppHeader";
import AppNavbar from "../AppNavbar/AppNavbar";
import AppFooter from "../AppFooter/AppFooter";

import SpotlightSearchProvider from "./SpotlightSearchProvider/SpotlightSearchProvider";

type Props = {
  collectionLinks: CollectionLink[];
  children: ReactNode;
  banner?: ReactNode;
};
const AppLayout = ({ collectionLinks, children, banner }: Props) => {
  const [openedNavbar, setOpenedNavbar] = useState(false);
  const { asPath } = useRouter();

  useEffect(() => {
    setOpenedNavbar(false);
  }, [asPath]);

  return (
    <SpotlightSearchProvider collectionLinks={collectionLinks}>
      <AppShell
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        fixed
        header={
          <AppHeader
            openedBurger={openedNavbar}
            onBurgerClick={() => setOpenedNavbar((opened) => !opened)}
          />
        }
        navbar={
          <AppNavbar opened={openedNavbar} collectionLinks={collectionLinks} />
        }
        padding={0}
      >
        {banner && (
          <Box
            sx={{
              position: "relative",
              height: 300,
            }}
          >
            {banner}
          </Box>
        )}
        <Container p="md" size="xl">
          {children}
        </Container>
        <AppFooter />
      </AppShell>
    </SpotlightSearchProvider>
  );
};

export default AppLayout;
