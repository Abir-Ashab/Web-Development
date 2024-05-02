import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

const Post = () => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Layout>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Blog Post: {slug}</h1>
        {/* Content of the blog post */}
      </div>
    </Layout>
  );
};

export default Post;
