import DocPage from '../../components/DocPage.tsx';

const Page = () => <DocPage routePath="" />;

export default Page;

export const getConfig = async () => ({ render: 'static' }) as const;
