import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import { AppRoutes } from "../../utils/routes";
import { useNavigate } from "react-router-dom";
import { a } from "@react-spring/web";
import { fetchUser, fetchSignOut } from "../../api/authApi";
import App from "../../App";
import { featchCreateOrder } from "../../api/orderApi";

let NAVIGATION = [
  {
    segment: AppRoutes.Home,
    title: "Home",
    icon: <HomeRoundedIcon />,
  },
  {
    segment: AppRoutes.Profile,
    title: "Profile",
    icon: <DashboardIcon />,
  },
];
let NAVIGATION_USER = [
  ...NAVIGATION,
  {
    segment: AppRoutes.OrderList,
    title: "History",
    icon: <DashboardIcon />,
  },
  {
    segment: `order-items`,
    title: "Cart",
    icon: <DashboardIcon />,
  },
];

const NAVIGATION_ADMIN = [
  ...NAVIGATION,
  {
    segment: `order`,
    title: "Orers",
    icon: <DashboardIcon />,
  },
];
const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function ResponsiveAppBar({ children }) {
  const [navigation, setNavigation] = React.useState(NAVIGATION);
  const [session, setSession] = React.useState({
    id: 0,
    name: "",
    email: "",
    image: "",
  });

  React.useState(() => {
    const loadDate = async () => {
      const user = await fetchUser();
      if (!user) {
        return;
      }
      if (user.role.name == "ADMIN") {
        setNavigation(NAVIGATION_ADMIN);
      } else {
        setNavigation(NAVIGATION_USER);
      }
    };
    loadDate();
  }, []);

  React.useEffect(() => {
    async function loadDate() {
      try {
        const response = await fetchUser();
        if (!response) {
          return;
        }
        console.log({
          id: String(response.id),
          name: response.firstName + " " + response.lastName,
          email: response.email,
          image: response.image,
        });

        setSession({
          user: {
            id: String(response.id),
            name: response.firstName + " " + response.lastName,
            email: response.email,
            // image: response.image,
          },
        });
      } catch (error) {
        console.error("Failed to load session", error);
      }
    }
    loadDate();
  }, []);

  const authentication = React.useMemo(() => {
    return {
      signIn: async () => {
        router.navigate(AppRoutes.SignIn);
        // navigate(AppRoutes.SignIn);
      },
      signOut: () => {
        setSession(null);
        fetchSignOut();
        router.navigate(AppRoutes.Home);
      },
    };
  }, []);

  const navigate = useNavigate();

  const [pathname, setPathname] = React.useState("/");

  const router = React.useMemo(() => {
    console.log(pathname);
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => {
        setPathname(String(path));
        return navigate(path);
      },
    };
  }, [pathname]);

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={navigation}
      router={router}
      theme={demoTheme}
      branding={{
        // logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: "Shop",
      }}
    >
      <DashboardLayout>{children}</DashboardLayout>
    </AppProvider>
  );
}

ResponsiveAppBar.propTypes = {
  window: PropTypes.func,
  children: PropTypes.node,
};
export default ResponsiveAppBar;
