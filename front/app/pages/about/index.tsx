import { setMeta } from 'app/modules/ui';
import { AboutPageProps, reverseRoute } from 'app/pages/router';
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
        <Link to={reverseRoute('top')}>top</Link>
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
