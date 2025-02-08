import { redirect } from "next/navigation";
import { isLoggedIn } from "../api/auth/auth";
import EditUserProfile from "../components/user-profile/profile";

export default async function Profile() {
    // check if user is logged in
    if (!(await isLoggedIn())) {
            redirect("/")
        }
        
    return(
        <div className="font-[family-name:var(--font-geist-sans)] mx-auto max-w-6xl my-6 px-4 sm:px-6 lg:px-8">
            <EditUserProfile />
        </div>
    )
};
