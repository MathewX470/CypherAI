import './signinPage.css'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='signinPage'>
      <SignIn path="/signin" signUpUrl='/signup' forceRedirectUrl="/dashboard"/>
    </div>
  )
}

export default SignInPage;