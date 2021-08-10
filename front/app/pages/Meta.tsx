import { useMemo } from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';

export default function Meta() {
  const pageMeta = useSelector(state => state.ui.pageMeta);
  const inPageLoading = useSelector(state => state.ui.pageLoading);

  const title = inPageLoading ? '読み込み中' : pageMeta?.title;
  const links = useMemo(
    () =>
      inPageLoading || !pageMeta?.canonical
        ? undefined
        : [{ rel: 'canonical', href: pageMeta.canonical }],
    [inPageLoading, pageMeta?.canonical]
  );
  const metaList = useMemo(
    () =>
      inPageLoading || !pageMeta
        ? undefined
        : [
            { name: 'description', content: pageMeta.description },
            { property: 'og:title', content: pageMeta.ogTitle },
            { property: 'og:type', content: pageMeta.ogType },
            { property: 'og:image', content: pageMeta.ogImage },
            { property: 'og:description', content: pageMeta.ogDescription },
          ],
    [inPageLoading, pageMeta]
  );

  return <Helmet title={title} link={links} meta={metaList} />;
}
