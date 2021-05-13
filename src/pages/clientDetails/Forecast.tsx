import { Fragment } from "react";
import { Tabs, Card, Table } from "antd";

const { TabPane } = Tabs;

const Forecast = () => {
  return (
    <Fragment>
      <Card>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Assets" key="1">
            <Table
              columns={[
                {
                  title: "Name",
                  dataIndex: "name",
                  key: "name",
                },
                {
                  title: "Year",
                  dataIndex: "amount",
                  key: "year",
                },
              ]}
              dataSource={[
                {
                  key: "1",
                  name: "Property",
                  amount: 321,
                },
                {
                  key: "2",
                  name: "Second Property",
                  amount: 422,
                },
              ]}
            />
          </TabPane>
          <TabPane tab="Liabilities" key="2">
            Content of card tab 2
          </TabPane>
          <TabPane tab="Income" key="3">
            Content of card tab 3
          </TabPane>
          <TabPane tab="Expenses" key="4">
            Content of card tab 3
          </TabPane>
          <TabPane tab="Tax" key="5">
            Content of card tab 3
          </TabPane>
        </Tabs>
      </Card>
    </Fragment>
  );
};
export default Forecast;
