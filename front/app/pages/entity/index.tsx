import { setMeta } from 'app/modules/ui';
import { makePath, PageProps } from 'app/pages/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Entity({ id }: PageProps<'entity'>) {
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
        <Link to={makePath('top')}>top</Link>
      </li>
      <li>
        <Link to={makePath('about')}>about</Link>
      </li>
      <li>
        <Link to={makePath('entities')}>entities</Link>
      </li>
    </ul>
  );
}
