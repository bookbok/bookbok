import { setMeta } from 'app/modules/ui';
import { EntitiesPageProps } from 'app/pages/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-empty-pattern
export default function Entities({}: EntitiesPageProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMeta({
        title: 'Entities | BookBok',
        canonical: 'https://www.bookbok.net/entities',
        description: 'BookBokについて説明',
      })
    );
  }, [dispatch]);
  return (
    <ul>
      <li>
        <Link to={'/'}>top</Link>
      </li>
      <li>
        <Link to={'/about'}>about</Link>
      </li>
      <li>
        <Link to={'/entities/1'}>entity</Link>
      </li>
    </ul>
  );
}
