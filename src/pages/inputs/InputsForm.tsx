import React, {useEffect, useState} from "react";
import {Affix, Anchor, Button, Col, Form, Row} from "antd";
import Layout from "antd/lib/layout/layout";

import Assets from "./inputSections/Assets";
import ClientInformation from "./inputSections/ClientInformation";
import Expenses from "./inputSections/Expenses";
import Income from "./inputSections/Income";
import Liabilities from "./inputSections/Liabilities";
import People from "./inputSections/People";
import SetDetails from "./inputSections/SetDetails";

import "./InputsForm.css";
import {
    IBankAccount,
    IChild,
    ICreditCards,
    INonEmploymentDefinedContributionPensionPlan,
    IDividendIncome,
    IEmploymentIncome, IExpenseDetails,
    IHousingDetails,
    IInputs, IInsurancePolicies,
    IMortgage, IOneOffExpenses,
    IOtherLoans,
    IOwner,
    IPensionIncomeDefinedBenifitPensionPlan,
    IPensionIncomeDefinedContributionPensionPlans,
    IProperty,
    IRentalIncome,
    ISelfEmploymentIncome,
    ISetDetails,
    ITaxableIncome, IIndividualSavingsAccounts, IIndividualSavingAccountDrawdowns,
} from "../../interfaces/ISubInputs";

import moment from "moment";
import axios from "axios";
import {RootStateOrAny, useDispatch, useSelector} from "react-redux";
import {GetInputsAction} from "../../redux/inputs/inputs";
import {useHistory} from "react-router-dom";


const {Link} = Anchor;

const InputsForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const userid: string = sessionStorage.getItem("userid")!
    const client = useSelector((state: RootStateOrAny) => state.activeClientReducer)


    const [targetOffset, setTargetOffset] = useState<number | undefined>(undefined);

    const [inputSetDetails, setInputSetDetails] = useState<ISetDetails>({
        input_set_name: `Input set of Mr ${client.lname}`,
        current_year: 0,
    });

    const [owners, setOwners] = useState<IOwner[]>([
        {
            id: "",
            name: `Mr ${client.lname}`,
            birth_year: 0,
            retirement_age: 65,
        },
    ]);
    const [children, setChildren] = useState<IChild[]>([
        {
            id: "",
            name: ``,
            birth_year: 0,
        },
    ]);

    const [properties, setProperties] = useState<IProperty[]>([
        {
            id: "",
            name: "",
            original_price: 0,
            start_year: 0,
            sell_in_future: false,
            end_year : 0,
            type_of_property: "Main Home",
            on_mortgage: false,
            mortgage_rate: 0,
        },
    ]);
    const [bankAccounts, setBankAccounts] = useState<IBankAccount>({
        original_balance: 0,
        minimum_cash_balance_acceptable: 0,
    });
    const [savingsAndInvestments, setSavingsAndInvestments] = useState<IIndividualSavingsAccounts[]>([
        {
            original_balance: 0,
            annual_contribution: 0,
        },
    ]);
    const [nonEmploymentDefinedContributionPensionPlans, setNonEmploymentDefinedContributionPensionPlans] = useState<INonEmploymentDefinedContributionPensionPlan[]>([
        {
            original_balance: 0,
            annual_contribution: 0,
        },
    ]);
    const [mortgages, setMortgages] = useState<IMortgage[]>([{
        interest_rate: 0,
        mortgage_period: 0,
        number_of_payments_per_year: 12
    }])
    const [otherLoans, setOtherLoans] = useState<IOtherLoans[]>([{
        id: "",
        name: "",
        original_balance: 0,
        interest_rate: 0,
        start_year: 0,
        loan_period: 0,
        number_of_payments_per_year: 12
    }]);
    const [creditCard, setCreditCard] = useState<ICreditCards>({
        id: "",
        name: "",
        original_balance: 0,
        interest_rate: 0
    })
    const [employmentIncome, setEmploymentIncome] = useState<IEmploymentIncome[]>([{
        gross_anual_amount: 0
    }])
    const [selfEmploymentIncome, setSelfEmploymentIncome] = useState<ISelfEmploymentIncome[]>([{
        gross_anual_amount: 0
    }])
    const [rentalIncome, setRentalIncome] = useState<IRentalIncome>({
        joint_annual_rental_income: 0,
        details: [{
            share_of_rental_income: 0,
            start_year: 0
        }]
    })
    const [dividendIncome, setDividendIncome] = useState<IDividendIncome[]>([{
        anual_amount: 0,
        start_year: 0,
        end_year: 0
    }])
    const [IndividualSavingsAccountDrawdowns, setIndividualSavingsAccountDrawdowns] = useState<IIndividualSavingAccountDrawdowns[]>([{
        owner_name: "",
        drawdowns: [
            {
                id: "",
                name: "Drawdown 1",
                amount_to_drawn_down: 0,
                start_year: 0,
                end_year: 0
            }
        ]
    }])
    const [pensionIncomeDefinedBenifitPensionPlans, setPensionIncomeDefinedBenifitPensionPlans] = useState<IPensionIncomeDefinedBenifitPensionPlan[]>([
        {
            option_taken: "Lump Sum",
            estimated_lump_sum: 0,
            estimated_annual_pension: 0,
            annual_increase: 0
        }
    ])
    const [pensionIncomeDefinedContributionPensionPlans, setPensionIncomeDefinedContributionPensionPlans] = useState<IPensionIncomeDefinedContributionPensionPlans[]>([
        {
            option_taken: "Lump Sum",
            drawdown_option_annual_amount: 0
        }
    ])
    const [otherTaxableIncome, setOtherTaxableIncome] = useState<ITaxableIncome[]>([{
        name: "",
        gross_annual_amount: 0,
        inflation: 0,
        start_year: 0,
        end_year: 0
    }])
    const [otherNonTaxableIncome, setOtherNonTaxableIncome] = useState<ITaxableIncome[]>([{
        name: "",
        gross_annual_amount: 0,
        inflation: 0,
        start_year: 0,
        end_year: 0
    }])
    const [housing, setHousing] = useState<IHousingDetails[]>([{
        id: "",
        name: "",
        annual_expense: 0,
        rate_after_retirement: 0,
        start_year: 0,
        end_year: 0,
        type: "property"
    }])
    const [consumables, setConsumables] = useState<IExpenseDetails[]>([{
        id: "",
        name: "",
        annual_expense: 0,
        rate_after_retirement: 0
    }])
    const [travel, setTravel] = useState<IExpenseDetails[]>([{
        id: "",
        name: "",
        annual_expense: 0,
        rate_after_retirement: 0
    }])
    const [shopping, setShopping] = useState<IExpenseDetails[]>([{
        id: "",
        name: "",
        annual_expense: 0,
        rate_after_retirement: 0
    }])
    const [entertainment, setEntertainment] = useState<IExpenseDetails[]>([{
        id: "",
        name: "",
        annual_expense: 0,
        rate_after_retirement: 0
    }])
    const [holiday, setHoliday] = useState<IExpenseDetails[]>([{
        id: "",
        name: "",
        annual_expense: 0,
        rate_after_retirement: 0
    }])
    const [insurancePolicies, setInsurancePolicies] = useState<IInsurancePolicies[]>([
        {
            name: "Life Insurance - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0
        },
        {
            name: "Life Insurance - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0
        },
        {
            name: "Critical Illness Cover - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0
        },
        {
            name: "Critical Illness Cover - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0
        },
        {
            name: "Family Income Benifit - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0
        },
        {
            name: "Family Income Benifit - ",
            annual_expense: 0,
            inflation: 0,
            rate_after_retirement: 0
        }])
    const [oneOffExpenses, setOneOffExpenses] = useState<IOneOffExpenses[]>([{
        id: "",
        inflation: 0,
        start_year: 0,
        annual_payment_in_todays_terms: 0,
        end_year: 0,
        name: ""
    }])
    const [childrenExpenses, setChildrenExpenses] = useState({
        primary_school_fees: 0,
        seconday_school_fees: 0,
        university_fees: 0,
    })

    const defaultFormFields = {
        input_set_name: inputSetDetails.input_set_name,
        current_year: moment(),
        owner_name1: owners[0].name,
        owner_birth_year1: moment().subtract(20, "y"),
        owner_retirement_age1: owners[0].retirement_age,
    };

    useEffect(() => {
        setTargetOffset(window.innerHeight / 3);
    }, []);


    const handleFinish = async () => {
        const newInputsObj: IInputs = {
            user_id: userid,
            input_set_name: inputSetDetails.input_set_name,
            current_year: inputSetDetails.current_year,
            household_owners: owners,
            children: children,
            assets: {
                properties: properties,
                bank_accounts: bankAccounts,
                savings_and_investments: {
                    individual_savings_account : savingsAndInvestments,
                    general_investment_account: [],
                },
                non_employment_defined_contribution_pension_plans: nonEmploymentDefinedContributionPensionPlans

            },
            liabilities: {
                mortgages: mortgages,
                other_loans: otherLoans,
                credit_card: creditCard
            },
            household_income: {
                employment_income: employmentIncome,
                self_employment_income: selfEmploymentIncome,
                rental_income: rentalIncome,
                dividend_income: dividendIncome,
                savings_and_investments_drawdowns: {
                    individual_savings_accounts: IndividualSavingsAccountDrawdowns,
                    general_investment_accounts: []
                },
                pension_income: {
                    defined_benifit_pension_plans: pensionIncomeDefinedBenifitPensionPlans,
                    defined_contribution_pension_plans: pensionIncomeDefinedContributionPensionPlans,

                },
                other_income: {
                    other_taxable_income: otherTaxableIncome,
                    other_non_taxable_income: otherNonTaxableIncome
                }
            },
            household_expenses: {
                blanket_inflation_rate: 0,
                housing: {
                    details: housing,
                    total: 0
                },
                consumables: {
                    details: consumables,
                    total: 0
                },
                shopping: {
                    details: shopping,
                    total: 0
                },
                travel: {
                    details: travel,
                    total: 0
                },
                entertainment: {
                    details: entertainment,
                    total: 0
                },
                holiday: {
                    details: holiday,
                    total: 0
                },
                insurance_policies: insurancePolicies,
                one_off_expenses: oneOffExpenses,
                children_education_expenses: {
                    primary_school_fees: {
                        annual_fee_in_todays_terms: childrenExpenses.primary_school_fees,
                        inflation: 0
                    },
                    seconday_school_fees: {
                        annual_fee_in_todays_terms: childrenExpenses.seconday_school_fees,
                        inflation: 0,
                    },
                    university_fees: {
                        annual_fee_in_todays_terms: childrenExpenses.university_fees,
                        inflation: 0,
                    }
                }

            }
        }


        try {
            const res = await axios.post("http://localhost:4000/api/inputs/123", newInputsObj)

            if (res.status === 200) {
                await dispatch(GetInputsAction(client._id))
                history.push("/clientdetails")
            }


        } catch (err) {
            console.log(err)
        }
    };

    return (
        <Layout style={{marginTop: "16px"}}>
            <Form layout="vertical" size="middle" onFinish={handleFinish} initialValues={defaultFormFields}>
                <Row>
                    <Col xl={4} lg={0} md={0} sm={0} xs={0}>
                        <Anchor style={{margin: "16px", background: "transparent"}} targetOffset={targetOffset}>
                            <Link href="#client-information" title="Client Information"/>
                            <Link href="#input-set-details" title="Input Set Details"/>
                            <Link href="#people" title="People">
                                <Link href="#owners" title="Owners"/>
                                <Link href="#children" title="Children"/>
                            </Link>
                            <Link href="#assets" title="Assets">
                                <Link href="#properties" title="Properties"/>
                                <Link href="#bank-account" title="Bank Account"/>
                                <Link href="#savings-and-investments" title="Savings and Investments"/>
                                <Link href="#defined-contribution-pension-plans"
                                      title="Defined Contribution Pension Plans"/>
                            </Link>
                            <Link href="#liabilities" title="Liabilities">
                                <Link href="#mortgages" title="Mortgages"/>
                                <Link href="#other-loans" title="Other Loans"/>
                                <Link href="#credit-card" title="Credit Card"/>
                            </Link>
                            <Link href="#income" title="Income">
                                <Link href="#employment-income" title="Employment Income"/>
                                <Link href="#self-employment-income" title="Self-Employment Income"/>
                                <Link href="#rental-income" title="Rental Income"/>
                                <Link href="#dividend-income" title="Dividend Income"/>
                                <Link href="#drawdowns" title="Drawdowns"/>
                                <Link href="#pension-plans" title="Pension Plans"/>
                                <Link href="#other-income" title="Other Income"/>
                            </Link>
                            <Link href="#expenses" title="Expenses">
                                <Link href="#housing" title="Housing"/>
                                <Link href="#consumables" title="Consumables"/>
                                <Link href="#travel" title="Travel"/>
                                <Link href="#shopping" title="Shopping"/>
                                <Link href="#entertainment" title="Entertainment"/>
                                <Link href="#holiday" title="Holiday"/>
                                <Link href="#insurance-policies" title="Insurance Policies"/>
                                <Link href="#one-off-expenses" title="One-Off Expenses"/>
                                <Link href="#children-education-expenses" title="Children Education Expenses"/>
                            </Link>
                        </Anchor>
                    </Col>
                    <Col xl={16} lg={24} md={24} sm={24} xs={24}>
                        {/* Client Information */}
                        <ClientInformation/>
                        {/* Input set details */}
                        <SetDetails
                            onChange={(e: any) => {
                                setInputSetDetails({...inputSetDetails, input_set_name: e.target.value});
                            }}
                            onDateChange={(dateString: any) => {
                                setInputSetDetails({...inputSetDetails, current_year: +dateString});
                            }}
                        />
                        {/* People */}
                        <People
                            owners={owners}
                            children={children}
                            savingsAndInvestments={savingsAndInvestments}
                            onDrawdownAdd={(clone: any) => {

                            }}
                            nonEmploymentDefinedContributionPensionPlans={nonEmploymentDefinedContributionPensionPlans}

                            onOwnerAdd={(clone: any, savingsAndInvestmentsClone: any, nonEmploymentDefinedContributionPensionPlansClone: any) => {
                                setOwners(clone);
                                setNonEmploymentDefinedContributionPensionPlans(nonEmploymentDefinedContributionPensionPlansClone)
                                setSavingsAndInvestments(savingsAndInvestmentsClone)

                                const clone2: IIndividualSavingsAccounts[] = [...savingsAndInvestments];
                                clone2.push({original_balance: 0, annual_contribution: 0});
                                setSavingsAndInvestments(clone2);

                                const clone3: INonEmploymentDefinedContributionPensionPlan[] = [...nonEmploymentDefinedContributionPensionPlans];
                                clone3.push({original_balance: 0, annual_contribution: 0});
                                setNonEmploymentDefinedContributionPensionPlans(clone3);

                                const clone4: IEmploymentIncome[] = [...employmentIncome]
                                clone4.push({
                                    gross_anual_amount: 0
                                })
                                setEmploymentIncome(clone4)

                                const clone5: ISelfEmploymentIncome[] = [...selfEmploymentIncome]
                                clone5.push({
                                    gross_anual_amount: 0
                                })
                                setSelfEmploymentIncome(clone5)

                                const clone6: IRentalIncome = {...rentalIncome}
                                clone6.details.push({
                                    share_of_rental_income: 0,
                                    start_year: 0
                                })
                                setRentalIncome(clone6)

                                const clone7: IDividendIncome[] = [...dividendIncome]
                                clone7.push({
                                    anual_amount: 0,
                                    start_year: 0,
                                    end_year: 0
                                })
                                setDividendIncome(clone7)

                                const clone8: IIndividualSavingAccountDrawdowns[] = [...IndividualSavingsAccountDrawdowns]
                                clone8.push({
                                    owner_name: "",
                                    drawdowns: [],
                                })
                                setIndividualSavingsAccountDrawdowns((clone8))


                                const clone9: IPensionIncomeDefinedBenifitPensionPlan[] = [...pensionIncomeDefinedBenifitPensionPlans]
                                clone9.push({
                                    option_taken: "Lump Sum",
                                    estimated_annual_pension: 0,
                                    estimated_lump_sum: 0,
                                    annual_increase: 0
                                })
                                setPensionIncomeDefinedBenifitPensionPlans(clone9)

                                const clone10: IPensionIncomeDefinedContributionPensionPlans[] = [...pensionIncomeDefinedContributionPensionPlans]
                                clone10.push({
                                    option_taken: "Lump Sum",
                                    drawdown_option_annual_amount: 0
                                })
                                setPensionIncomeDefinedContributionPensionPlans(clone10)

                            }}
                            onChildAdd={(clone: any) => {
                                setChildren(clone);
                            }}
                            onOwnerChange={(clone: any) => {
                                setOwners(clone);
                            }}
                            onChildChange={(clone: any) => {
                                setChildren(clone);
                            }}
                        />
                        {/* Assets */}
                        <Assets
                            owners={owners}
                            properties={properties}
                            mortgages={mortgages}
                            bankAccounts={bankAccounts}
                            savingsAndInvestments={savingsAndInvestments}
                            nonEmploymentDefinedContributionPensionPlans={nonEmploymentDefinedContributionPensionPlans}
                            onPropertyAdd={(clone: IProperty[], clone2: IMortgage[]) => {
                                setProperties(clone);
                                setMortgages(clone2)
                            }}
                            onPropertyChange={(clone: IProperty[]) => {
                                setProperties(clone);
                            }}
                            onBankAccountsChange={(clone: IBankAccount) => setBankAccounts(clone)}
                            onSavingsAndInvestmentsChange={(clone: IIndividualSavingsAccounts[]) => {
                                setSavingsAndInvestments(clone);
                            }}
                            onDefinedContributionPensionPlansChange={(clone: INonEmploymentDefinedContributionPensionPlan[]) => {
                                setNonEmploymentDefinedContributionPensionPlans(clone);
                            }}
                        />
                        {/* Liabilities */}
                        <Liabilities
                            properties={properties}
                            mortgages={mortgages}
                            otherLoans={otherLoans}
                            creditCard={creditCard}
                            onPropertyChange={(clone: IProperty[]) => {
                                setProperties(clone)
                            }}
                            onMortgageChange={(clone: IMortgage[]) => {
                                setMortgages((clone))
                            }}
                            onOtherLoanAdd={(clone: IOtherLoans[]) => {
                                setOtherLoans(clone)
                            }}
                            onOtherLoanChange={(clone: IOtherLoans[]) => {
                                setOtherLoans(clone)
                            }}
                            onCreditCardChange={(clone: ICreditCards) => {
                                setCreditCard(clone)
                            }}
                        />
                        {/* Income */}
                        <Income
                            owners={owners}
                            employmentIncome={employmentIncome}
                            selfEmploymentIncome={selfEmploymentIncome}
                            rentalIncome={rentalIncome}
                            dividendIncome={dividendIncome}
                            IndividualSavingsAccountDrawdowns={IndividualSavingsAccountDrawdowns}
                            onDrawdownAdd={(clone: IIndividualSavingAccountDrawdowns[]) => {
                                setIndividualSavingsAccountDrawdowns(clone)
                            }}
                            pensionIncomeDefinedBenifitPensionPlans={pensionIncomeDefinedBenifitPensionPlans}
                            pensionIncomeDefinedContributionPensionPlans={pensionIncomeDefinedContributionPensionPlans}
                            otherTaxableIncome={otherTaxableIncome}
                            otherNonTaxableIncome={otherNonTaxableIncome}

                            onOwnerChange={(e: any) => {
                                setOwners(e)
                            }}

                            onEmploymentIncomeChange={(clone: IEmploymentIncome[]) => {
                                setEmploymentIncome(clone)
                            }}

                            onSelfEmploymentChange={(clone: ISelfEmploymentIncome[]) => {
                                setSelfEmploymentIncome(clone)
                            }}

                            onRentalIncomeChange={(clone: IRentalIncome) => {
                                setRentalIncome(clone)
                            }}

                            onDividendIncomeChange={(clone: IDividendIncome[]) => {
                                setDividendIncome(clone)
                            }}

                            onSavingsAndInvestmentsDrawdownsChange={(clone: IIndividualSavingAccountDrawdowns[]) => {
                                setIndividualSavingsAccountDrawdowns(clone)
                            }}

                            onPensionIncomeDefinedBenifitPensionPlansChange={(clone: IPensionIncomeDefinedBenifitPensionPlan[]) => {
                                setPensionIncomeDefinedBenifitPensionPlans(clone)
                            }}

                            onPensionIncomeDefinedContributionPensionPlansChange={(clone: IPensionIncomeDefinedContributionPensionPlans[]) => {
                                setPensionIncomeDefinedContributionPensionPlans(clone)
                            }}

                            onOtherTaxableIncomeChange={(clone: ITaxableIncome[]) => {
                                setOtherTaxableIncome(clone)
                            }}

                            onOtherNonTaxableIncomeChange={(clone: ITaxableIncome[]) => {
                                setOtherNonTaxableIncome(clone)
                            }}

                        />
                        {/* Expenses */}
                        <Expenses
                            owners={owners}
                            housing={housing}
                            consumables={consumables}
                            travel={travel}
                            shopping={shopping}
                            entertainment={entertainment}
                            holiday={holiday}
                            insurancePolicies={insurancePolicies}
                            oneOffExpenses={oneOffExpenses}
                            childrenExpenses={childrenExpenses}

                            onHousingAdd={(clone: IHousingDetails[]) => {
                                setHousing(clone)
                            }}
                            onConsumablesAdd={(clone: IExpenseDetails[]) => {
                                setConsumables(clone)
                            }}
                            onTravelAdd={(clone: IExpenseDetails[]) => {
                                setTravel(clone)
                            }}
                            onShoppingAdd={(clone: IExpenseDetails[]) => {
                                setShopping(clone)
                            }}
                            onEntertainmentAdd={(clone: IExpenseDetails[]) => {
                                setEntertainment(clone)
                            }}
                            onHolidayAdd={(clone: IExpenseDetails[]) => {
                                setHoliday(clone)
                            }}
                            onInsurancePoliciesAdd={() => {
                            }}
                            onOneOffExpensesAdd={(clone: IOneOffExpenses[]) => {

                                setOneOffExpenses(clone)
                            }}

                            onHousingChange={(clone: IHousingDetails[]) => {
                                setHousing(clone)
                            }}
                            onConsumablesChange={(clone: IExpenseDetails[]) => {
                                setConsumables(clone)
                            }}
                            onTravelChange={(clone: IExpenseDetails[]) => {
                                setTravel(clone)
                            }}
                            onShoppingChange={(clone: IExpenseDetails[]) => {
                                setShopping(clone)
                            }}
                            onEntertainmentChange={(clone: IExpenseDetails[]) => {
                                setEntertainment(clone)
                            }}
                            onHolidayChange={(clone: IExpenseDetails[]) => {
                                setHoliday(clone)
                            }}
                            onInsurancePoliciesChange={(clone: IInsurancePolicies[]) => {
                                setInsurancePolicies(clone)
                            }}
                            onOneOffExpensesChange={(clone: IOneOffExpenses[]) => {

                                setOneOffExpenses(clone)
                            }}

                            onChildrenExpensesChange={(clone: any) => {
                                setChildrenExpenses(clone)
                            }}
                        />
                    </Col>
                </Row>
                <Row justify="end">
                    <Affix offsetBottom={50} style={{marginRight: "50px"}}>
                        <Button htmlType="submit" type="primary" size="large">
                            Submit
                        </Button>
                    </Affix>
                </Row>
            </Form>
        </Layout>
    );
};

export default InputsForm;
