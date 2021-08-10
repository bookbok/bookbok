import { setMeta } from 'app/modules/ui';
import { makePath, PageProps } from 'app/pages/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-empty-pattern
export default function About({}: PageProps<'about'>) {
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
        <Link to={makePath('top')}>top</Link>
      </li>
      <li>
        <Link to={makePath('entities')}>entities</Link>
      </li>
      <li>
        <Link to={makePath({ pageType: 'entity', id: 1 })}>entity</Link>
      </li>
    </ul>
  );
}
