import { ReactElement, useEffect, useState } from 'react';

export default function A(): ReactElement {
  const [a] = useState<string>();
  useEffect(() => {
    if (a) {
      console.debug(a);
    }
  }, []);
  return <div>A</div>;
}
