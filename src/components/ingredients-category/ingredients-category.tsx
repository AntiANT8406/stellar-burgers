import { forwardRef, useMemo } from 'react';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '@utils-types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';
import { useAppSelector } from '@store';
import { burgerConstructor } from '@slices';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const currentBun = useAppSelector(burgerConstructor.selectCurrentBun);
  const currentIngredients = useAppSelector(
    burgerConstructor.selectCurrentIngredients
  );
  const burgerConstructorData = {
    bun: currentBun,
    ingredients: currentIngredients
  };

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients } = burgerConstructorData;
    const counters: { [key: string]: number } = {};
    ingredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [burgerConstructorData]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={ingredientsCounters}
      ref={ref}
    />
  );
});
