import {PlusCircleOutlined} from "@ant-design/icons";
import {Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row} from "antd";
import {IChild, IOwner} from "../../../interfaces/ISubInputs";

const People = (props: any) => {
    const owners: IOwner[] = props.owners;
    const children: IOwner[] = props.children;

    return (
        <Card title="People" id="people" style={{margin: "16px"}}>
            {/* Owners */}
            <div id="owners"/>
            <Divider orientation="left">
                Owners
                {owners.length < 2 &&  <Button
                    type="link"
                    onClick={() => {
                        const clone: IOwner[] = [...owners];
                        clone.push({id: "", name: "", birth_year: 0, retirement_age: 65});


                        props.onOwnerAdd(clone);
                    }}
                >
                    <PlusCircleOutlined/>
                </Button>}
            </Divider>
            {owners.map((o: any, i: any) => {
                return (
                    <Row key={i + "owner"}>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label="Owner Name" name={`owner_name${i + 1}`}>
                                <Input
                                    placeholder="John Doe"
                                    onBlur={(e) => {
                                        const clone: IOwner[] = [...owners];
                                        clone[i].name = e.target.value;
                                        props.onOwnerChange(clone);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label="Birth Year" name={`owner_birth_year${i + 1}`}>
                                <DatePicker
                                    picker="year"
                                    className="custom-input-fields"
                                    onChange={(date: any, dateString: any) => {
                                        const clone: IOwner[] = [...owners];
                                        clone[i].birth_year = +dateString;
                                        props.onOwnerChange(clone);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label="Retirement Age" name={`owner_retirement_age${i + 1}`}>
                                <InputNumber
                                    className="custom-input-fields"
                                    placeholder="65"
                                    name="retirement_age"
                                    onBlur={(e) => {
                                        const clone: IOwner[] = [...owners];
                                        clone[i].retirement_age = +e.target.value;
                                        props.onOwnerChange(clone);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            })}

            {/* Children */}
            <div id="children"/>
            <Divider orientation="left">
                Children
                <Button
                    type="link"
                    onClick={() => {
                        const clone: IChild[] = [...children];
                        clone.push({id: "", name: "", birth_year: 0});
                        props.onChildAdd(clone);
                    }}
                >
                    <PlusCircleOutlined/>
                </Button>
            </Divider>
            {children.map((c, i) => {
                return (
                    <Row key={i + "child"}>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label="Child Name">
                                <Input
                                    placeholder="Doe Jr"
                                    onBlur={(e) => {
                                        const clone: IChild[] = [...children];
                                        clone[i].name = e.target.value;
                                        props.onChildChange(clone);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
                            <Form.Item label="Birth Year">
                                <DatePicker
                                    picker="year"
                                    className="custom-input-fields"
                                    onChange={(date: any, dateString: any) => {
                                        const clone: IChild[] = [...children];
                                        clone[i].birth_year = +dateString;
                                        props.onChildChange(clone);
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                );
            })}
        </Card>
    );
};

export default People;
