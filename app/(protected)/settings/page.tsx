

import { auth, signOut } from "@/auth"


const SettingsPage = async () => {
    const session = await auth();
    console.log(session)
  return (
    <div>
        {JSON.stringify(session)}
        <form action={ async () => {
          "use server";
          await signOut()
          window.location.replace("http://localhost:3000/auth/signin")
        }}>
          <button type="submit">
            Sign out
          </button>
        </form>
    </div>
  )
}

export default SettingsPage
