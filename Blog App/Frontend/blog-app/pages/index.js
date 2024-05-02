import Layout from '../components/Layout';

const Home = () => {
  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Welcome to My Blog</h1>
        {/* Display blog posts here */}
      </div>
    </Layout>
  );
};

export default Home;
