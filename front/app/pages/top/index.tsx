import { setMeta } from 'app/modules/ui';
import { makePath, PageProps } from 'app/pages/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// eslint-disable-next-line no-empty-pattern
export default function Top({}: PageProps<'top'>) {
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
    <ul>
      <li>
        <Link to={makePath('about')}>about</Link>
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
