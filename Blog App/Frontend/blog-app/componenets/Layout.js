import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>My Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-gray-800 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">My Blog</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link href="/"><a className="text-white">Home</a></Link></li>
              <li><Link href="/about"><a className="text-white">About</a></Link></li>
              <li><Link href="/posts"><a className="text-white">Posts</a></Link></li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-gray-800 py-4 text-white text-center">
        <div className="container mx-auto">
          &copy; 2024 My Blog
        </div>
      </footer>
    </div>
  );
};

export default Layout;
