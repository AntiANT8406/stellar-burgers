import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store';
import { feed } from '@slices';

export const Feed: FC = () => {
  const dispatch = useAppDispatch();
  const feedData = useAppSelector(feed.selectFeed);
  const isLoading = feedData.isLoading;
  const orders = feedData.orders;

  useEffect(() => {
    dispatch(feed.getFeedThunk());
  }, []);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(feed.getFeedThunk());
      }}
    />
  );
};
