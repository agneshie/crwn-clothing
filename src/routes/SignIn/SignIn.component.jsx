import { signInWithGooglePopup, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

function SignIn() {

  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);

    
  }

  return(
    <div>
      <h1>SIGN IN PAGE</h1>
      <button onClick={logGoogleUser}>
        SIGN IN WITH GOOGLE
      </button>
    </div>
  );
}

export default SignIn;