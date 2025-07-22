import './signinPage.css'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <div className='signinPage'>
      <SignIn path="/signin"/>
    </div>
  )
}

export default SignInPage;