import { Link } from 'react-router-dom';
import { AboutPageProps } from 'app/pages/types';

// eslint-disable-next-line no-empty-pattern
export default function About({}: AboutPageProps) {
  return (
    <div>
      <Link to={'/'}>top</Link>
    </div>
  );
}
