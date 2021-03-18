import React, { useState } from "react";

import { Button, Card, Col, Form, Image, Input, Layout, Row, Space, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from "@ant-design/icons";

import { Content } from "antd/lib/layout/layout";

//@ts-ignore
import Logo from "../../assets/logo.png";
import Title from "antd/lib/typography/Title";
import { Link, useHistory } from "react-router-dom";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { LoginAction } from "../../redux/auth/auth";
import { dashboardRoute, registerFormRoute } from "../../routes/navRoutes";
import { getAssumptionsAction } from "../../redux/assumptions/assumptions";

const { Text } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state: RootStateOrAny) => state.loadingReducer);

  const [userInfo, setUserInfo] = useState({ email: "", password: "" });

  const onFinish = async () => {
    const status: any = await dispatch(LoginAction(userInfo));
    if (status === 200) {
      await dispatch(getAssumptionsAction());
      history.push(dashboardRoute);
    }
  };

  return (
    <Layout className="layout" style={{ backgroundColor: "white" }}>
      <Content>
        <Row justify="center">
          <Card style={{ marginTop: "10%", width: "500px" }} bordered={false}>
            <Row justify="center">
              <Image src={Logo} width={100} preview={false} />
            </Row>
            <Row justify="center" style={{ marginTop: 20 }}>
              <Space direction="vertical" size={-5} align="center">
                <Title level={4}>Log in to your account</Title>
                <Text type="secondary">Enter your credentials below</Text>
              </Space>
            </Row>
            <Row justify="center" style={{ marginTop: 20 }}>
              <Col span={24}>
                <Form layout="vertical" size="large" onFinish={onFinish}>
                  <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
                    <Input
                      placeholder="Email"
                      prefix={<UserOutlined type="secondary" />}
                      type="email"
                      name="email"
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="password" rules={[{ required: true, message: "Password is required" }]}>
                    <Input.Password
                      placeholder="Password"
                      size="large"
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      prefix={<LockOutlined />}
                      name="password"
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary" size="large" block loading={loading}>
                      Sign in
                    </Button>
                    <Row style={{ marginTop: "10px" }}>
                      <Col span={12}>
                        <Row justify="start">
                          <Link to="" type="link">
                            Forgot password?
                          </Link>
                        </Row>
                      </Col>
                      <Col span={12}>
                        <Row justify="end">
                          <Link to={registerFormRoute} type="link">
                            Create account
                          </Link>
                        </Row>
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Card>
        </Row>
      </Content>
    </Layout>
  );
};

export default Login;
