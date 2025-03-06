import { useAuth, useUser } from '@clerk/nextjs';
import Link from 'next/link';

export default function RoleBasedButton() {
    const {user} = useUser();

  if (user && user?.publicMetadata?.role === 'admin') {
    return (
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        <Link href='/admin'>Admin Dashboard</Link>
      </button>
    );
  }else if(user) {
    return(
        <button className="bg-red-500 text-white px-4 py-2 rounded">
        <Link href='/user'>User Dashboard</Link>
      </button>
    )
  }

  // Return null if the user doesn't have the required role
  return null;
}