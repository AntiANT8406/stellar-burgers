import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Route, Routes } from 'react-router-dom';

import { AppHeader, Modal, OrderInfo, IngredientDetails } from '@components';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <Routes>
      <Route path='/' element={<ConstructorPage />} />
      <Route path='/feed' element={<Feed />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/profile/orders' element={<ProfileOrders />} />
      <Route path='*' element={<NotFound404 />} />

      <Route
        path='/ingredients/:id'
        element={
          <Modal title='Детали ингредиента' onClose={() => {}}>
            <IngredientDetails />
          </Modal>
        }
      />
      {/* <Route path='/feed/:number' element={<OrderInfo />} />
      <Route path='/profile/orders/:id' element={<OrderInfo />} /> */}
    </Routes>
  </div>
);

export default App;
