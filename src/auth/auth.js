import { signUp, confirmSignUp, autoSignIn, signIn, signOut } from 'aws-amplify/auth';



async function handleSignUpConfirmation({ username, confirmationCode }) {
  try {
    const { isSignUpComplete, nextStep } = await confirmSignUp({
      username,
      confirmationCode
    });
    return {
        isSignUpComplete,
        nextStep
    }
  } catch (error) {
    console.log('error confirming sign up', error);
  }
}

async function handleSignUp({ username, password, email }) {
  try {
    const { isSignUpComplete, userId, nextStep } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email
        },
        // optional
        autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
      }
    });

    console.log(userId);
    return {isSignUpComplete, userId, nextStep}
  } catch (error) {
    console.log('error signing up:', error);
  }
}
async function handleAutoSignIn() {
    try {
      const signInOutput = await autoSignIn();
      console.log({signInOutput})
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSignIn({ username, password }) {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      return {
        isSignedIn,
        nextStep
      }
    } catch (error) {
      console.log('error signing in', error);
    }
  }
  async function handleSignOut() {
    try {
      await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

export {
    handleSignUp,
    handleSignUpConfirmation,
    handleAutoSignIn,
    handleSignIn,
    handleSignOut
}