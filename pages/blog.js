import BlogPost from '../components/landingComponents/blog/Blosgpost';
import TopButton from '../components/landingComponents/blog/TopButton';
import stylesblog from '../styles/blog.module.css'

export default function Blog({ devDotToPosts }) {
  return (
    <div id='nav'>
      <TopButton />
      <h2 className="mb-4 font-bold text-3xl">Posts{' '+devDotToPosts.length}</h2>
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {devDotToPosts.map(
          (post,{
            id,
            type_of,
            comments_count,
            published_at,
            description,
            title,
            tag_list,
            social_image,
            positive_reactions_count,
            slug
          }) => {
            return (
              post.type_of === 'article' && (
                <BlogPost
                  key={post.id}
                  id={post.id}
                  img={post.social_image}
                  createdAt={post.published_at}
                  title={post.title}
                  desc={post.description}
                  slug={post.slug}
                  likes={post.positive_reactions_count}
                  comments={post.comments_count}
                  tagList={post.tag_list}
                />
              )
            );
          }
        )}
      </div>
    </div>
  );
}

export const getStaticProps = async () => {
  const devDotToPosts = await fetch(
    `https://dev.to/api/articles?username=${process.env.DEV_USERNAME}`
  );

  const res = await devDotToPosts.json();

  return {
    props: {
      devDotToPosts: res
    },
    
  };
};