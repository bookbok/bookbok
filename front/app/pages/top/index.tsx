import { Link } from 'react-router-dom';
import { TopPageProps } from 'app/pages/types';

// eslint-disable-next-line no-empty-pattern
export default function Top({}: TopPageProps) {
  return (
    <div>
      <Link to={'/about'}>about</Link>
    </div>
  );
}
