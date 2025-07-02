import { paths } from '@src/shared/constants/constants';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div>
      <Link to={paths.loginPage}>Login</Link>
      {' | '}
      <Link to={paths.registerPage}>Register</Link>
    </div>
  );
};
