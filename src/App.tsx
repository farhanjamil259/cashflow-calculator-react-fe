import "antd/dist/antd.css";
import Layout, {Content} from "antd/lib/layout/layout";
import React from "react";

import {Route, Switch} from "react-router-dom";
import HeadNav from "./components/navigation/HeadNav";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ClientDashboard from "./pages/clientDetails/ClientDashboard";
import ClientsList from "./pages/dashboard/ClientsList";

import "./App.css";
import "./App.less";
import {inputsFormRoute,} from "./routes/navRoutes";
import InputsForm from "./pages/inputs/InputsForm";

import Loading from "./pages/General/Loading";
import SideNav from "./pages/clientDetails/SideNav";
import HouseholdDetails from "./pages/clientDetails/HouseholdDetails";
import Cashflow from "./pages/clientDetails/Cashflow";
import AssetsAndLiabilities from "./pages/clientDetails/AssetsAndLiabilities";
import IncomeBreakdown from "./pages/clientDetails/IncomeBreakdown";
import ExpensesBreakdown from "./pages/clientDetails/ExpensesBreakdown";
import Assumption from "./pages/assumptions/Assumption";
import LifeMilestones from "./pages/clientDetails/LifeMilestones";

function App() {
    return (
        <Layout style={{backgroundColor: "white"}}>
            <Route path="/dashboard" component={HeadNav}/>
            <Route path="/assumption" component={HeadNav}/>
            <Content>
                <Layout>
                    <Route path="/dashboard/clientDashboard/clientPlanDetails" component={SideNav}/>
                    <Content>
                        <Switch>
                            <Route exact path="/" component={Loading}/>
                            <Route exact path="/login" component={Login}/>
                            <Route exact path="/register" component={Register}/>
                            <Route exact path="/dashboard" component={ClientsList}/>
                            <Route exact path="/dashboard/clientDashboard" component={ClientDashboard}/>
                            <Route exact path={inputsFormRoute} component={InputsForm}/>
                            <Route exact path={"/assumption"} component={Assumption}/>

                            <Route exact path={"/dashboard/clientDashboard/clientPlanDetails/lifeMilestones"} component={LifeMilestones} />
                            <Route exact path={"/dashboard/clientDashboard/clientPlanDetails"}
                                   component={HouseholdDetails}/>
                            <Route exact path={"/dashboard/clientDashboard/clientPlanDetails/cashflow"}
                                   component={Cashflow}/>
                            <Route exact path={"/dashboard/clientDashboard/clientPlanDetails/assetsAndLiabilities"}
                                   component={AssetsAndLiabilities}/>
                            <Route exact path={"/dashboard/clientDashboard/clientPlanDetails/incomeBreakdown"}
                                   component={IncomeBreakdown}/>
                            <Route exact path={"/dashboard/clientDashboard/clientPlanDetails/expensesBreakdown"}
                                   component={ExpensesBreakdown}/>
                        </Switch>
                    </Content>
                </Layout>
            </Content>
        </Layout>
    );
}

export default App;
