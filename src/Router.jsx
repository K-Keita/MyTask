import React from "react";
import { Route, Switch } from "react-router";
import {
  AnonymousSign,
  CardList,
  CreateGroup,
  DescriptionGroups,
  DescriptionNight,
  DescriptionMorning,
  EditMyInfomation,
  Home,
  RegistTodayMessage,
  RegistTomorrowTask,
  Reset,
  SignIn,
  SignUp,
} from "./templates/index";
import Auth from "./Auth";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp} />
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/signin/test"} component={AnonymousSign} />
      <Route exact path={"/signin/reset"} component={Reset} />
      <Route exact path={"/home"} component={Home} />
      <Auth>
        <Route exact path={"(/)?"} component={CardList} />
        <Route path={"/list(/:id)?"} component={CardList} />
        <Route exact path={"/create"} component={CreateGroup} />
        <Route
          exact
          path={"/description/groups"}
          component={DescriptionGroups}
        />
        <Route
          exact
          path={"/description/morning"}
          component={DescriptionMorning}
        />
        <Route exact path={"/description/night"} component={DescriptionNight} />
        <Route path={"/regist/card(/:id)?"} component={RegistTomorrowTask} />
        <Route path={"/wakeup(/:id)?"} component={RegistTodayMessage} />
        <Route exact path={"/edit"} component={EditMyInfomation} />
      </Auth>
    </Switch>
  );
};

export default Router;
