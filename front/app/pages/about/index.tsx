import { setMeta } from 'app/modules/ui';
import { AboutPageProps } from 'app/pages/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-empty-pattern
export default function About({}: AboutPageProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMeta({
        title: 'About | BookBok',
        canonical: 'https://www.bookbok.net/about',
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
        <Link to={'/entities'}>entities</Link>
      </li>
      <li>
        <Link to={'/entities/1'}>entity</Link>
      </li>
    </ul>
  );
}
