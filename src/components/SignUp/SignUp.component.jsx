import {useState} from 'react';

import FormInput from '../FormInput/FormInput.component';
import Button from '../Button/Button.component';

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from  '../../utils/firebase/firebase.utils';

import './SignUp.styles.scss';

function SignUp() {

  const [ formFields, setFormFields] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      const userDocRef = await createUserDocumentFromAuth(user, {displayName});
      setFormFields({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

    } catch(error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Cannot create user, email already in use");
        } else {
          console.log("User creation encountered an error", error);          
        }
        
    }

  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // setFormFields((prevValue) => {
    //   return {
    //     ...prevValue,
    //     [name]: value
    //   };
    // });
    setFormFields({
      ...formFields,
      [name]: value
    });

  }

  return(
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name" 
          type="text" 
          required
          name="displayName"
          value={displayName}
          onChange={handleInputChange}
        />

        <FormInput 
          label="Email"
          type="email" 
          required
          name="email"
          value={email}
          onChange={handleInputChange}  
        />

        <FormInput 
          label="Password"
          type="password" 
          required
          name="password"
          value={password}
          onChange={handleInputChange}
        />

        <FormInput 
          label="Confirm Password"
          type="password" 
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleInputChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
}

export default SignUp;