import { user } from '@slices';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store';

export const Profile: FC = () => {
  const userData = useAppSelector(user.selectUser);
  const dispatch = useAppDispatch();

  const [formValue, setFormValue] = useState({
    name: userData!.name,
    email: userData!.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: userData?.name || '',
      email: userData?.email || ''
    }));
  }, [userData]);

  const isFormChanged =
    formValue.name !== userData?.name ||
    formValue.email !== userData?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(user.updateUser({ name: formValue.name, email: formValue.email }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: userData!.name,
      email: userData!.email,
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
