import { FaUserCircle } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { UserWrapper } from '../styles/UserWrapper';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function User() {
  const route = useRouter();
  const { user } = useUser();

  if (!user) {
    return (
      <div onClick={() => route.push('/api/auth/login')}>
        <FaUserCircle />
        <h3>Profile</h3>
      </div>
    );
  } else {
    return (
      <UserWrapper onClick={() => route.push('/profile')}>
        <img src={user.picture} alt={user.name} />
        <h3>{user.name}</h3>
      </UserWrapper>
    );
  }
}
