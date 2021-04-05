import { Button, Col, Image, Menu, Row, Dropdown, Divider, Avatar } from "antd";
import { Link, Route } from "react-router-dom";

import Logo from "../../assets/logo_light.png";
import { RootStateOrAny, useSelector } from "react-redux";
import { UserOutlined } from "@ant-design/icons";
import IInputs from "../../interfaces/IInputs";
import React from "react";

const HeadNav = () => {
  const user = useSelector((state: RootStateOrAny) => state.userReducer);
  const currentInputSet: IInputs = useSelector((state: RootStateOrAny) => state.currentInputSetReducer);

  const planMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={"/dashboard/editPlan"}>Edit Plan</Link>
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={"/dashboard/clientDashboard"}>Client Dashboard</Link>
      </Menu.Item>
    </Menu>
  );

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/assumption">Assumptions</Link>
      </Menu.Item>
      <Menu.Item key="3" style={{ marginTop: "16px" }}>
        <Link to="/login">Log out</Link>
      </Menu.Item>
    </Menu>
  );

  const PlanInfo = () => {
    return (
      <div>
        <Dropdown overlay={planMenu}>
          <Button type={"link"} style={{ color: "black" }} onClick={(e) => e.preventDefault()}>
            {currentInputSet.input_set_name}
          </Button>
        </Dropdown>

        <Divider type="vertical" />
        <Dropdown overlay={userMenu}>
          <Button type={"link"} style={{ color: "black" }} onClick={(e) => e.preventDefault()}>
            {currentInputSet.household_owners
              ? `${currentInputSet.household_owners[0].name},  ${currentInputSet.household_owners[1].name}`
              : ""}
          </Button>
        </Dropdown>
      </div>
    );
  };
  return (
    <div style={{ background: "white", marginLeft: "20px", marginTop: "10px", marginBottom: "16px" }}>
      <Row align="middle">
        <Col span={3}>
          <Row justify="start">
            <Image src={Logo} width={200} preview={false} />
          </Row>
        </Col>
        <Col span={3}>
          <Row justify="start"></Row>
        </Col>
        <Col span={17}>
          <Row justify="end" align="middle">
            <Route path="/dashboard/clientDashboard/clientPlanDetails" component={PlanInfo} />

            <Avatar size="default" icon={<UserOutlined />} style={{ marginLeft: "16px" }} />
            <Dropdown overlay={menu}>
              <Button type={"link"} onClick={(e) => e.preventDefault()}>
                {user.name}
              </Button>
            </Dropdown>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default HeadNav;
