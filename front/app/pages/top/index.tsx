import { setMeta } from 'app/modules/ui';
import { reverseRoute, TopPageProps } from 'app/pages/router';
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
    <ul>
      <li>
        <Link to={reverseRoute('about')}>about</Link>
      </li>
      <li>
        <Link to={reverseRoute('entities')}>entities</Link>
      </li>
      <li>
        <Link to={reverseRoute({ pageType: 'entity', id: 1 })}>entity</Link>
      </li>
    </ul>
  );
}
