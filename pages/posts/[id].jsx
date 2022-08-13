import Layout from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css"
import Head from "next/head"

export const getStaticPaths = async () => {
    const paths = getAllPostIds();

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async ({ params }) => {
    const postData = await getPostData(params.id);

    return {
        props: {
            postData
        }
    }
}

const Post = ({ postData }) => {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.lightText} >{postData.date}</div>
                <div dangerouslySetInnerHTML={{ __html: postData.blogContentHTML }} />
            </article>
        </Layout>
    );
}

export default Post;