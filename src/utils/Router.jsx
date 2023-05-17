import { Flex, Box } from "@chakra-ui/react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Checkout from "../pages/Checkout";
import Account from "../pages/Account";
import User from "../pages/User";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import SettingPassword from "../pages/SettingPassword";
import NotFound from "../pages/404";
import Topbar from "../components/Home/Topbar";
import BackHeader from "../components/Checkout/BackHeader";
import Footer from "../components/Footer";
import ItemContainerPage from "../components/Home/ItemContainerPage";
import Search from "../components/Home/Search";
import Active from "../components/Active";
import ResetPasswordPage from '../components/ResetPassword'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Topbar />
        <Box flex="1">
          <Home />
        </Box>
        <Footer />
      </Flex>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/search",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Topbar />
        <Box flex="1">
          <Search />
        </Box>
        <Footer />
      </Flex>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/phones/:phoneid",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Topbar />
        <Box flex="1">
          <ItemContainerPage></ItemContainerPage>
        </Box>
        <Footer />
      </Flex>
    ),
    errorElement: <NotFound />,
  },
  {
    path: `/auth/active`,
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex="1">
          <Active></Active>
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: `/auth/resetPassword`,
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex="1">
          <ResetPasswordPage></ResetPasswordPage>
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: "checkout",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <BackHeader />
        <Box flex="1">
          <Checkout />
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: "user",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex="1">
          <User />
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: "account/signin",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex="1">
          <Account />
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: "account/signup",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex={"1"}>
          <Account />
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: "forgot-password",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex="1">
          <ForgotPassword />
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: "reset-password",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex="1">
          <ResetPassword />
        </Box>
        <Footer />
      </Flex>
    ),
  },
  {
    path: "setting-password",
    element: (
      <Flex flexDir={"column"} minH={"100vh"}>
        <Box flex="1">
          <SettingPassword />
        </Box>
        <Footer />
      </Flex>
    ),
  },
]);

export default router;
