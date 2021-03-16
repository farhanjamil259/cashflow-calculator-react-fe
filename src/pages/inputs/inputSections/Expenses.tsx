import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Col, DatePicker, Divider, Form, Input, InputNumber, Row } from "antd";

import Text from "antd/lib/typography/Text";
import {
  IExpenseDetails,
  IHousingDetails,
  IInsurancePolicies,
  IOneOffExpenses,
  IOwner,
} from "../../../interfaces/ISubInputs";
import { useState, useEffect } from "react";

/*eslint no-useless-escape: "off"*/
const Expenses = (props: any) => {
  const owners: IOwner[] = props.owners;
  const housing: IHousingDetails[] = props.housing;
  const consumables: IExpenseDetails[] = props.consumables;
  const travel: IExpenseDetails[] = props.travel;
  const shopping: IExpenseDetails[] = props.shopping;
  const entertainment: IExpenseDetails[] = props.entertainment;
  const holiday: IExpenseDetails[] = props.holiday;
  const insurancePolicies: IInsurancePolicies[] = props.insurancePolicies;
  const oneOffExpenses: IOneOffExpenses[] = props.oneOffExpenses;
  const childrenExpenses: any = props.childrenExpenses;

  const [housingTotal, setHousingTotal] = useState<number>(0);
  const [consumablesTotal, setConsumablesTotal] = useState<number>(0);
  const [travelTotal, setTravelTotal] = useState<number>(0);
  const [shoppingTotal, setShoppingTotal] = useState<number>(0);
  const [entertainmentTotal, setEntertainmentTotal] = useState<number>(0);
  const [holidayTotal, setHolidayTotal] = useState<number>(0);

  useEffect(() => {
    let newHousingTotal = 0;
    housing.map((expense) => {
      newHousingTotal += expense.annual_expense;
      return expense;
    });
    setHousingTotal(newHousingTotal);

    let newConsumableTotal = 0;
    consumables.map((expense) => {
      newConsumableTotal += expense.annual_expense;
      return expense;
    });
    setConsumablesTotal(newConsumableTotal);

    let newTravelTotal = 0;
    travel.map((expense) => {
      newTravelTotal += expense.annual_expense;
      return expense;
    });
    setTravelTotal(newTravelTotal);

    let newShoppingTotal = 0;
    shopping.map((expense) => {
      newShoppingTotal += expense.annual_expense;
      return expense;
    });
    setShoppingTotal(newShoppingTotal);

    let newEntertainment = 0;
    entertainment.map((expense) => {
      newEntertainment += expense.annual_expense;
      return expense;
    });
    setEntertainmentTotal(newEntertainment);

    let newHolidayTotal = 0;
    holiday.map((expense) => {
      newHolidayTotal += expense.annual_expense;
      return expense;
    });
    setHolidayTotal(newHolidayTotal);
  }, [housing, consumables, shopping, travel, setEntertainmentTotal, entertainment, holiday]);

  return (
    <Card title="Expenses" id="expenses" style={{ margin: "16px", borderColor: "#e57373" }}>
      {/* Housing */}
      <div id="housing" />
      <Divider orientation="left">
        Housing
        <Button
          type="link"
          onClick={() => {
            const clone: IHousingDetails[] = [...housing];
            clone.push({
              id: "",
              name: "",
              annual_expense: 0,
              rate_after_retirement: 0,
              start_year: 0,
              end_year: 0,
              type: "utility",
            });
            props.onHousingAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {housing.map((expense: IHousingDetails, i: number) => {
        return (
          <Row key={i + "housing"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Expense:">
                <Input
                  placeholder="Rent"
                  onBlur={(e) => {
                    const clone: IHousingDetails[] = [...housing];
                    clone[i].name = e.target.value;
                    props.onHousingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual expense:">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IHousingDetails[] = [...housing];

                    clone[i].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onHousingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="% After retirement: ">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IHousingDetails[] = [...housing];

                    clone[i].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                    props.onHousingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Start Year:">
                <DatePicker
                  picker="year"
                  className="custom-input-fields"
                  onChange={(date: any, dateString: any) => {
                    const clone: IHousingDetails[] = [...housing];
                    clone[i].start_year = +dateString;
                    props.onHousingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="End Year">
                <DatePicker
                  picker="year"
                  className="custom-input-fields"
                  onChange={(date: any, dateString: any) => {
                    const clone: IHousingDetails[] = [...housing];
                    clone[i].end_year = +dateString;
                    props.onHousingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Total:</Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <InputNumber
              value={housingTotal}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              disabled
              className="custom-input-fields"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Consumables */}
      <div id="consumables" />
      <Divider orientation="left">
        Consumables
        <Button
          type="link"
          onClick={() => {
            const clone: IExpenseDetails[] = [...consumables];
            clone.push({
              id: "",
              name: "",
              annual_expense: 0,
              rate_after_retirement: 0,
            });
            props.onConsumablesAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {consumables.map((expense: any, i: number) => {
        return (
          <Row key={i + "consumables"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Expense:">
                <Input
                  placeholder="Eating Out"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...consumables];
                    clone[i].name = e.target.value;
                    props.onConsumablesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual expense:">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...consumables];

                    clone[i].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onConsumablesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="% After retirement">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...consumables];

                    clone[i].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                    props.onConsumablesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Total:</Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <InputNumber
              value={consumablesTotal}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              disabled
              className="custom-input-fields"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Travel */}
      <div id="travel" />
      <Divider orientation="left">
        Travel
        <Button
          type="link"
          onClick={() => {
            const clone: IExpenseDetails[] = [...travel];
            clone.push({
              id: "",
              name: "",
              annual_expense: 0,
              rate_after_retirement: 0,
            });
            props.onTravelAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {travel.map((expense: any, i: number) => {
        return (
          <Row key={i + "travel"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Expense:">
                <Input
                  placeholder="Travel Card-Husband"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...travel];
                    clone[i].name = e.target.value;
                    props.onTravelChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual expense:">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...travel];

                    clone[i].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onTravelChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="% After retirement">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...travel];

                    clone[i].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                    props.onTravelChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Total:</Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <InputNumber
              value={travelTotal}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              disabled
              className="custom-input-fields"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Shopping */}
      <div id="shopping" />
      <Divider orientation="left">
        Shopping
        <Button
          type="link"
          onClick={() => {
            const clone: IExpenseDetails[] = [...shopping];
            clone.push({
              id: "",
              name: "",
              annual_expense: 0,
              rate_after_retirement: 0,
            });
            props.onShoppingAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {shopping.map((expense: any, i: number) => {
        return (
          <Row key={i + "shopping"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Expense:">
                <Input
                  placeholder="Clothing and Accessories"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...shopping];
                    clone[i].name = e.target.value;
                    props.onShoppingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual expense:">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...shopping];

                    clone[i].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onShoppingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="% After retirement">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...shopping];

                    clone[i].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                    props.onShoppingChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Total:</Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <InputNumber
              value={shoppingTotal}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              disabled
              className="custom-input-fields"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Entertainment */}
      <div id="entertainment" />
      <Divider orientation="left">
        Entertainment
        <Button
          type="link"
          onClick={() => {
            const clone: IExpenseDetails[] = [...entertainment];
            clone.push({
              id: "",
              name: "",
              annual_expense: 0,
              rate_after_retirement: 0,
            });
            props.onEntertainmentAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {entertainment.map((expense: any, i: number) => {
        return (
          <Row key={i + "entertainment"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Expense:">
                <Input
                  placeholder="Drinks"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...entertainment];
                    clone[i].name = e.target.value;
                    props.onEntertainmentChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual expense:">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...entertainment];

                    clone[i].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onEntertainmentChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="% After retirement">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...entertainment];

                    clone[i].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                    props.onEntertainmentChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Total:</Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <InputNumber
              value={entertainmentTotal}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              disabled
              className="custom-input-fields"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Holiday */}
      <div id="holiday" />
      <Divider orientation="left">
        Holiday
        <Button
          type="link"
          onClick={() => {
            const clone: IExpenseDetails[] = [...holiday];
            clone.push({
              id: "",
              name: "",
              annual_expense: 0,
              rate_after_retirement: 0,
            });
            props.onHolidayAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {holiday.map((expense: any, i: number) => {
        return (
          <Row key={i + "holiday"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Expense:">
                <Input
                  placeholder="Flights"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...holiday];
                    clone[i].name = e.target.value;
                    props.onHolidayChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual expense:">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...holiday];

                    clone[i].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onHolidayChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="% After retirement">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IExpenseDetails[] = [...holiday];

                    clone[i].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                    props.onHolidayChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Total:</Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <InputNumber
              value={holidayTotal}
              formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              disabled
              className="custom-input-fields"
            />
          </Form.Item>
        </Col>
      </Row>
      {/* Insurance Policies */}
      <div id="insurance-policies" />
      <Divider orientation="left">Insurance Policies</Divider>
      <Row>
        <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>
              Life Insurance <Text strong>{owners[0].name}</Text>
            </Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Annual Expense:">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[0].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Inflation:">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[0].inflation = +e.target.value.replace("%", "") / 100;

                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="% After retirement:">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[0].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      {owners.length > 1 && (
        <Row>
          <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label=" ">
              <Text>
                Life Insurance <Text strong>{owners[1].name}</Text>
              </Text>
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="Annual Expense:">
              <InputNumber
                formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[1].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="Inflation:">
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value!.replace("%", "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[1].inflation = +e.target.value.replace("%", "") / 100;

                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="% After retirement:">
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value!.replace("%", "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[1].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>
              Critical Illness Cover <Text strong>{owners[0].name}</Text>
            </Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Annual Expense:">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[2].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Inflation:">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[2].inflation = +e.target.value.replace("%", "") / 100;

                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="% After retirement:">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[2].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      {owners.length > 1 && (
        <Row>
          <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label=" ">
              <Text>
                Critical Illness Cover <Text strong>{owners[1].name}</Text>
              </Text>
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="Annual Expense:">
              <InputNumber
                formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[3].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="Inflation:">
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value!.replace("%", "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[3].inflation = +e.target.value.replace("%", "") / 100;

                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="% After retirement:">
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value!.replace("%", "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[3].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      <Row>
        <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>
              Family Income Benefit <Text strong>{owners[0].name}</Text>
            </Text>
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Annual Expense:">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[4].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Inflation:">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[4].inflation = +e.target.value.replace("%", "") / 100;

                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="% After retirement:">
            <InputNumber
              min={0}
              max={100}
              formatter={(value) => `${value}%`}
              parser={(value: any) => value!.replace("%", "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: IInsurancePolicies[] = [...insurancePolicies];

                clone[4].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                props.onInsurancePoliciesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      {owners.length > 1 && (
        <Row>
          <Col lg={6} md={6} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label=" ">
              <Text>
                Family Income Benefit <Text strong>{owners[1].name}</Text>
              </Text>
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="Annual Expense:">
              <InputNumber
                formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[5].annual_expense = +e.target.value.replace(/£\s?|(,*)/g, "");
                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="Inflation:">
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value!.replace("%", "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[5].inflation = +e.target.value.replace("%", "") / 100;

                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
          <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
            <Form.Item label="% After retirement:">
              <InputNumber
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value: any) => value!.replace("%", "")}
                className="custom-input-fields"
                onBlur={(e) => {
                  const clone: IInsurancePolicies[] = [...insurancePolicies];

                  clone[5].rate_after_retirement = +e.target.value.replace("%", "") / 100;

                  props.onInsurancePoliciesChange(clone);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      )}

      {/* One-Off Expenses */}
      <div id="one-off-expenses" />
      <Divider orientation="left">
        One-Off Expenses
        <Button
          type="link"
          onClick={() => {
            const clone: IOneOffExpenses[] = [...oneOffExpenses];
            clone.push({
              id: "",
              name: "",
              annual_payment_in_todays_terms: 0,
              inflation: 0,
              start_year: 0,
              end_year: 0,
            });
            props.onOneOffExpensesAdd(clone);
          }}
        >
          <PlusCircleOutlined />
        </Button>
      </Divider>
      {oneOffExpenses.map((expense: any, i: number) => {
        return (
          <Row key={i + "oneOffExpenses"}>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Expense:">
                <Input
                  placeholder="Main House Renovation"
                  onBlur={(e) => {
                    const clone: IOneOffExpenses[] = [...oneOffExpenses];
                    clone[i].name = e.target.value;
                    props.onOneOffExpensesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Annual expense">
                <InputNumber
                  formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IOneOffExpenses[] = [...oneOffExpenses];

                    clone[i].annual_payment_in_todays_terms = +e.target.value.replace(/£\s?|(,*)/g, "");
                    props.onOneOffExpensesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Inflation:">
                <InputNumber
                  min={0}
                  max={100}
                  formatter={(value) => `${value}%`}
                  parser={(value: any) => value!.replace("%", "")}
                  className="custom-input-fields"
                  onBlur={(e) => {
                    const clone: IOneOffExpenses[] = [...oneOffExpenses];

                    clone[i].inflation = +e.target.value.replace("%", "") / 100;

                    props.onOneOffExpensesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="Start year:">
                <DatePicker
                  picker="year"
                  className="custom-input-fields"
                  onChange={(date: any, dateString: any) => {
                    const clone: IOneOffExpenses[] = [...oneOffExpenses];
                    clone[i].start_year = +dateString;
                    props.onOneOffExpensesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
            <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
              <Form.Item label="End year:">
                <DatePicker
                  picker="year"
                  className="custom-input-fields"
                  onChange={(date: any, dateString: any) => {
                    const clone: IOneOffExpenses[] = [...oneOffExpenses];
                    clone[i].start_year = +dateString;
                    props.onOneOffExpensesChange(clone);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        );
      })}
      {/* Children Education Expenses */}
      <div id="children-education-expenses" />
      <Divider orientation="left">Children Education Expenses</Divider>

      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Primary School Fee</Text>
          </Form.Item>
        </Col>
        <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Annual Fees">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: any = { ...childrenExpenses };

                clone.primary_school_fees = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onChildrenExpensesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>Secondary School Fee</Text>
          </Form.Item>
        </Col>
        <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Annual Fees">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: any = { ...childrenExpenses };

                clone.seconday_school_fees = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onChildrenExpensesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col lg={4} md={4} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label=" ">
            <Text>University Fee</Text>
          </Form.Item>
        </Col>
        <Col lg={5} md={5} sm={24} xs={24} className="custom-input-fields">
          <Form.Item label="Annual Fees">
            <InputNumber
              formatter={(value) => "£" + `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              parser={(value: any) => value!.replace(/£\s?|(,*)/g, "")}
              className="custom-input-fields"
              onBlur={(e) => {
                const clone: any = { ...childrenExpenses };

                clone.university_fees = +e.target.value.replace(/£\s?|(,*)/g, "");
                props.onChildrenExpensesChange(clone);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default Expenses;
