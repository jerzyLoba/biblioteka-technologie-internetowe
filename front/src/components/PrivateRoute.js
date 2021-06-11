import React from "react";
import { Route, Redirect } from "react-router";

const PrivateRoute = ({
  redirect = "/login",
  component: Component,
  authed,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed === true ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect
            to={{
              pathname: `${redirect}`,
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
