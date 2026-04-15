import "./amplifyConfig";
import { signIn, signOut, fetchAuthSession } from "aws-amplify/auth";

export const login = async (email, password) => {
  try {

    await signOut();
  } catch (err) {

  }

  await signIn({
    username: email,
    password,
  });

  const session = await fetchAuthSession();

  const token = session.tokens?.idToken?.toString();

  return token;
};