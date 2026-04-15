import { signUp } from "aws-amplify/auth";

export const registerUser = async (email, password, firstName) => {
  const response = await signUp({
    username: email,
    password,
    options: {
      userAttributes: {
        email,
        given_name: firstName, 
      },
    },
  });

  return response;
};