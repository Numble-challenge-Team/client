import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropsWithChildren } from 'react';

interface CustomHeadProps {
  title: string;
  keywords?: string[];
  description?: string;
}

function CustomHead({ title, keywords, description, children }: PropsWithChildren<CustomHeadProps>) {
  const router = useRouter();

  // console.log({ router: `${BASE_URL}/${router.asPath}` });
  return (
    <Head>
      {/* Common */}
      <title>{title}</title>
      <meta name="robots" content="ALL" />
      <meta name="author" content="OZ" />
      <meta httpEquiv="content-type" content="text/html; charset=en" />
      <meta name="content-language" content="ko" />
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      {description && <meta name="description" content={description} />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ko_KR" />
      {/* <meta property="og:url" content={`https://www.ourszoo.site/${router.asPath}`} /> */}
      <meta property="og:site_name" content="OZ" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}

      {/* Custom */}
      {children}
    </Head>
  );
}

export default CustomHead;
