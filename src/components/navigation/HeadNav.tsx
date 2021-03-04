import {Button, Col, Image, Menu, Row, Dropdown, Divider, Avatar} from "antd";
import {Link, Route, useLocation} from "react-router-dom";

import Logo from "../../assets/logo_light.png";
import {RootStateOrAny, useSelector} from "react-redux";
import {LeftOutlined, SettingFilled, UserOutlined} from "@ant-design/icons";
import IInputs from "../../interfaces/IInputs";
import React from "react";

const HeadNav = () => {
    const location = useLocation();
    const user = useSelector((state: RootStateOrAny) => state.userReducer)
    const currentInputSet: IInputs = useSelector(
        (state: RootStateOrAny) => state.currentInputSetReducer
    );
    const menu = (
        <Menu>
            <Menu.Item key="1">
                <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to="/assumption">Assumptions</Link>
            </Menu.Item>
            <Menu.Item key="3" style={{marginTop: "16px"}}><Link to="/login">Log out</Link></Menu.Item>
        </Menu>
    );

    const PlanInfo = () => {
        return <div>
            {currentInputSet.input_set_name}
            <Divider type="vertical"/>
            {currentInputSet.household_owners ? `${currentInputSet.household_owners[0].name},  ${currentInputSet.household_owners[1].name}` : ""}
        </div>
    }
    return (
        <div style={{background: "white", marginLeft: "20px", marginTop: "10px", marginBottom: "16px"}}>
            <Row align="middle">
                <Col span={3}>

                    <Row justify="start">
                        <Image src={Logo} width={200} preview={false}/>
                    </Row>
                </Col>
                <Col span={3}>
                    <Row justify="start">

                    </Row>
                </Col>
                <Col span={17}>
                    <Row justify="end" align="middle">


                        <Route path="/dashboard/clientDashboard/clientPlanDetails" component={PlanInfo}/>

                        <Avatar size="default" icon={<UserOutlined/>} style={{marginLeft: "16px"}}/>
                        <Dropdown overlay={menu}>
                            <Button type={"link"} onClick={e => e.preventDefault()}>
                                {user.name}
                            </Button>
                        </Dropdown>
                    </Row>
                </Col>

                {/*<Col span={21}>*/}
                {/*  <Row justify="end">*/}
                {/*    <Menu mode="horizontal" defaultSelectedKeys={["1"]} style={{border : "none"}}>*/}
                {/*      <Menu.Item key="1">*/}
                {/*        <Link to="/dashboard">Dashboard</Link>*/}
                {/*      </Menu.Item>*/}
                {/*      <Menu.Item key="2">*/}
                {/*        <Link to="/assumption">Assumptions</Link>*/}
                {/*      </Menu.Item>*/}
                {/*      <Menu.Item key="3">*/}
                {/*        <Button type="link" danger>*/}
                {/*          <Link to="/login">Log out</Link>*/}
                {/*        </Button>*/}
                {/*      </Menu.Item>*/}
                {/*    </Menu>*/}
                {/*  </Row>*/}
                {/*</Col>*/}
            </Row>
        </div>
    );
};

export default HeadNav;