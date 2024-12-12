import { user } from '@slices';
import { useAppSelector } from '@store';
import { Preloader } from '@ui';
import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: ProtectedRouteProps): ReactElement => {
  const location = useLocation();
  const userData = useAppSelector(user.selectUser);
  const isAuthChecked = useAppSelector(user.selectIsAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && userData) {
    return <Navigate replace to={location.state?.from.pathname || '/'} />;
  }
  if (!onlyUnAuth && !userData) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }
  return children;
};
