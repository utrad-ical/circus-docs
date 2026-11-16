import type { ReactNode } from 'react';
import Footer from '../components/Footer.tsx';
import NavBar from '../components/NavBar.tsx';
import '../styles/global.css';

const RootLayout = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
};

export default RootLayout;

export const getConfig = async () => ({ render: 'static' }) as const;
