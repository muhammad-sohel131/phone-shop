import { useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function RoleBasedButton() {
    const {user} = useUser();

  if (user && user?.publicMetadata?.role === 'admin') {
    return (
        <Link className="bg-blue-500 text-white px-4 py-2 rounded" href='/admin'>Admin Dashboard</Link>
    );
  }else if(user) {
    return(
        <Link className="bg-red-500 text-white px-4 py-2 rounded" href='/user'>User Dashboard</Link>
    )
  }

  // Return null if the user doesn't have the required role
  return null;
}