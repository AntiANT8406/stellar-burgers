import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { ingredients } from '@slices';
import { NotFound404 } from '@pages';
import { useAppSelector } from '@store';

export const IngredientDetails: FC = () => {
  const { id } = useParams();
  if (!id) return <NotFound404 />;

  const ingredientData = useAppSelector((state) =>
    ingredients.selectIngredientById(state, id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
