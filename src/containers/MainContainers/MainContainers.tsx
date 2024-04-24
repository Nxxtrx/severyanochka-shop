import React, { FC, useEffect } from 'react';
import Banner from '../../components/Banner/Banner';
import MainCards from '../../components/MainCards/MainCards';
import { postAPI } from '../../services/PostServices';
import SpecialEvent from '../../components/SpecialEvent/SpecialEvent';
import { useAppDispatch } from '../../hooks/redux';
import { fetchFood } from '../../store/redusers/ActionCreaters';
import Preloader from '../../components/Preloader/Preloader';

const MainContainers: FC = () => {
  // получения данных с типом "new"
  const { data: newFood, isLoading: isNewFoodLoading } = postAPI.useFetchAllPostsQuery({
    start: 0,
    end: 4,
    type: 'new',
  });

  // получения данных с типом "sale"
  const { data: saleFood, isLoading: isSaleFoodLoading } = postAPI.useFetchAllPostsQuery({
    start: 0,
    end: 4,
    type: 'sale',
  });

  const dispatch = useAppDispatch();
  // console.log(food)

  useEffect(() => {
    void dispatch(fetchFood());
  }, [dispatch]);

  // const handleAddToCart = (foodItem: IFood[]): void => {
  //   dispatch(addToCart(foodItem));
  // };

  return (
    <main className="main">
      <Banner />
      {isNewFoodLoading && isSaleFoodLoading && <Preloader />}
      {saleFood != null && <MainCards title="Акции" linkTitle="Все акции" data={saleFood} />}
      {newFood != null && <MainCards title="Новинки" linkTitle="Все новинки" data={newFood} />}
      <SpecialEvent />
    </main>
  );
};

export default MainContainers;
