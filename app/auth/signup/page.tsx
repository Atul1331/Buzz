import AuthPanel from "@/components/auth/auth-panel"
import SignupForm from "@/components/auth/signup-form"


const SignupPage = () => {
  return (
    <div className="h-full flex justify-around items-center bg-gradient-to-bl from-slate-800 via-black to-slate-900">
        <AuthPanel />
        <SignupForm />
    </div>
  )
}

export default SignupPage

