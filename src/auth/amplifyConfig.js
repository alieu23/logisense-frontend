import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "us-east-2_u7s949C4b",
      userPoolClientId: "5e872midvsatu36ljlfsuqeq7o",
    },
  },
});

console.log("Amplify configured");