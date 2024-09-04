import AuthPanel from "@/components/auth/auth-panel"
import LoginForm from "@/components/auth/login-form"


const SigninPage = () => {
  return (
    <div className="h-full flex justify-around items-center bg-gradient-to-bl from-slate-800 via-black to-slate-900">
        <AuthPanel />
        <LoginForm />
    </div>
  )
}

export default SigninPage

