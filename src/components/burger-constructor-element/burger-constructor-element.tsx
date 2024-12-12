import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useAppDispatch } from '../../services/store';
import { burgerConstructor } from '@slices';
export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useAppDispatch();
    const handleMoveDown = () => {
      dispatch(burgerConstructor.moveDownInCurrentIngredients(index));
    };

    const handleMoveUp = () => {
      dispatch(burgerConstructor.moveUpInCurrentIngredients(index));
    };

    const handleClose = () => {
      console.log('handleClose');
      dispatch(burgerConstructor.removeFromCurrentIngredients(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
