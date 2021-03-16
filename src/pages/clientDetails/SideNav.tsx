import { Menu } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Link } from "react-router-dom";
import { useState } from "react";

const SideNav = () => {
  const [menuKey, setMenuKey] = useState(["1"]);

  return (
    <>
      <Sider style={{ background: "white" }}>
        <Menu mode="inline" defaultSelectedKeys={menuKey} style={{ height: "100%" }}>
          <Menu.Item key="0">
            <Link
              to={"/dashboard/clientDashboard/clientPlanDetails/lifeMilestones"}
              onClick={() => setMenuKey(["0"])}
            >
              Life Milestones
            </Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to={"/dashboard/clientDashboard/clientPlanDetails"} onClick={() => setMenuKey(["1"])}>
              Household Details
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link
              to={"/dashboard/clientDashboard/clientPlanDetails/cashflow"}
              onClick={() => setMenuKey(["3"])}
            >
              Cashflow
            </Link>
          </Menu.Item>
          <Menu.Item key="4" onClick={() => setMenuKey(["4"])}>
            <Link to={"/dashboard/clientDashboard/clientPlanDetails/assetsAndLiabilities"}>
              Assets and Liabilities
            </Link>
          </Menu.Item>
          <Menu.Item key="5">
            <Link
              to={"/dashboard/clientDashboard/clientPlanDetails/incomeBreakdown"}
              onClick={() => setMenuKey(["5"])}
            >
              Income Breakdown
            </Link>
          </Menu.Item>
          <Menu.Item key="6">
            <Link
              to={"/dashboard/clientDashboard/clientPlanDetails/expensesBreakdown"}
              onClick={() => setMenuKey(["6"])}
            >
              Expenses Breakdown
            </Link>
          </Menu.Item>
          <Menu.Item key="7">
            <Link to={"/dashboard/clientDashboard"} onClick={() => setMenuKey(["7"])}>
              Client Dashboard
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};

export default SideNav;
