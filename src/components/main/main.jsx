import { Outlet } from "react-router-dom";
import Sidebar from "../ui/sidebar/sidebar";
import Header from "../ui/header/header";
import ResponsiveDrawer from "../layout";
import "./main.css";

const Main = () => {
  return (
      <div>
          <ResponsiveDrawer />
      </div>
  );
};

export default Main;
