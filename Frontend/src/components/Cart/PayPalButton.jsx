import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

import React from "react";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  // Ensure amount is always a string with two decimals
  const roundedAmount = Number(amount).toFixed(2);

  return (
    <PayPalScriptProvider
      options={{
        clientId:
          "AZAy3PsVrrhX8-d3l5wuRbptslJr_OCimsgSfyKqx0KNrGeTg8I0x09g8nQ9JHTewXc8Hq9OdyEDTLRT",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical" }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [{ amount: { value: roundedAmount } }],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(onSuccess);
        }}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
