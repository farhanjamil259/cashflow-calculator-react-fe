import { Card, Col, DatePicker, Form, Input, Row } from "antd";

const SetDetails = (props: any) => {
  return (
    <Card id="input-set-details" title="Input Set Details" style={{ margin: "16px" }}>
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Input Set Name" name="input_set_name">
            <Input
              placeholder="Inputs for person 1"
              name="input_set_name"
              onBlur={(e) => {
                props.onChange(e);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24}>
          <Form.Item label="Current Year" name="current_year">
            <DatePicker
              picker="year"
              className="custom-input-fields"
              name="current_year"
              onChange={(date: any, dateString: any) => {
                props.onDateChange(dateString);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default SetDetails;
