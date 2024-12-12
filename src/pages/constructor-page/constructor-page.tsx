import { FC } from 'react';
import { get } from 'http';

import styles from './constructor-page.module.css';

import { useAppSelector } from '@store';
import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';
import { ingredients } from '@slices';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useAppSelector(ingredients.selectIsLoading);
  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
