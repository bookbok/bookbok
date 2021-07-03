import { setMeta } from 'app/modules/ui';
import { TopPageProps } from 'app/pages/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-empty-pattern
export default function Top({}: TopPageProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMeta({
        title: 'BookBok',
        canonical: 'https://www.bookbok.net/',
        description: 'デフォルトの説明文',
      })
    );
  }, [dispatch]);
  return (
    <div>
      <Link to={'/about'}>about</Link>
    </div>
  );
}
