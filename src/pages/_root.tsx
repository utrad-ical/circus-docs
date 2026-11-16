import type { ReactNode } from 'react';
import { themeBootstrapScript } from '../utils/theme.ts';

const RootElement = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/img/favicon.ico" />
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
};

export default RootElement;

export const getConfig = async () => ({ render: 'static' }) as const;
