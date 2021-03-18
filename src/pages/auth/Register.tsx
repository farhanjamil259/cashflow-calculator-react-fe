import React, { useState } from "react";

import { Card, Col, Image, Input, Layout, Row, Space, Typography, Form, Button } from "antd";
import {
  UserOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PaperClipOutlined,
} from "@ant-design/icons";

import { Content } from "antd/lib/layout/layout";

//@ts-ignore
import Logo from "../../assets/logo.png";
import Title from "antd/lib/typography/Title";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { RegisterAction } from "../../redux/auth/auth";
import { loginFormRoute } from "../../routes/navRoutes";

const { Text } = Typography;

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector((state: RootStateOrAny) => state.loadingReducer);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [cPassword, setCPassword] = useState("");

  const onFinish = async () => {
    if (cPassword === userInfo.password) {
      const status: any = await dispatch(RegisterAction(userInfo));
      if (status === 201) {
        history.push(loginFormRoute);
      }
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
                <Title level={4}>Register a new account</Title>
                <Text type="secondary">Enter your credentials below</Text>
              </Space>
            </Row>
            <Row justify="center" style={{ marginTop: 20 }}>
              <Col span={24}>
                <Form layout="vertical" size="large" onFinish={onFinish}>
                  <Form.Item name="name" rules={[{ required: true, message: "Name is required" }]}>
                    <Input
                      placeholder="Name"
                      prefix={<UserOutlined type="secondary" />}
                      name="name"
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="email" rules={[{ required: true, message: "Email is required" }]}>
                    <Input
                      placeholder="Email"
                      prefix={<PaperClipOutlined />}
                      type="email"
                      name="email"
                      onChange={(e) => {
                        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: "Password cannot be empty" }]}
                  >
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
                  <Form.Item
                    name="cpassword"
                    rules={[{ required: true, message: "Password cannot be empty" }]}
                  >
                    <Input.Password
                      placeholder="Confirm Password"
                      size="large"
                      iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                      prefix={<LockOutlined />}
                      name="cpassword"
                      onChange={(e) => {
                        setCPassword(e.target.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" type="primary" size="large" block loading={loading}>
                      Sign up
                    </Button>
                    <Row style={{ marginTop: "10px" }}>
                      <Text type="secondary">
                        Already have an account?{" "}
                        <Link to={loginFormRoute} type="link">
                          Sign in
                        </Link>
                      </Text>
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

export default Register;
