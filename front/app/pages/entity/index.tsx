import { setMeta } from 'app/modules/ui';
import { EntityPageProps } from 'app/pages/types';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Entity({ id }: EntityPageProps) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setMeta({
        title: 'BookBok',
        canonical: 'https://www.bookbok.net/',
        description: 'デフォルトの説明文',
      })
    );

    // TODO: ここでAPIリクエスト
  }, [dispatch, id]);
  return (
    <ul>
      <li>
        <Link to={'/'}>top</Link>
      </li>
      <li>
        <Link to={'/about'}>about</Link>
      </li>
      <li>
        <Link to={'/entities'}>entities</Link>
      </li>
    </ul>
  );
}
