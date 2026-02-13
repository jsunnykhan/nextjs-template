import { withAuth } from "@/app/auth/withAuth"
import UserSettingsPage from "@/features/user-settings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'User Profile',
  description: 'logged in user profile',
}; 

function page() {
  return (
    <UserSettingsPage />
  )
}

export default withAuth(page)