import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
const Breadcrumbs = () => {
  return (
    <Breadcrumb style={{ marginLeft: "50px", marginTop: "16px" }}>
      <Breadcrumb.Item>
        <Link to="/">Dashboard</Link>
      </Breadcrumb.Item>

      <Breadcrumb.Item>An Application</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default Breadcrumbs;
