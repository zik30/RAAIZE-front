import { routes } from '@src/shared/constants/constants';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <Link to={routes.login}>Login</Link>
      {' | '}
      <Link to={routes.register}>Register</Link>
    </div>
  );
};
