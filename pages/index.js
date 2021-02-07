import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ post }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");

  const getPosts = async (event) => {
    event.preventDefault();
    setUserId(event.target.id.value);
    console.log(userId);
    setLoading(true);
    const url = `https://medium-feed-next.vercel.app/api?id=${event.target.id.value}`;
    // console.log(url);
    const res = await fetch(url);
    const result = await res.json();

    // console.log( result);
    setPosts(result);

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Get Medium Blogs!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Get Medium Blogs!</h1>

        <p className={styles.description}>
          Enter the ID of the user/publication without `@`.
        </p>

        <form onSubmit={getPosts}>
          <input
            id="id"
            type="text"
            autoComplete="name"
            required
            placeholder="jainamdesai"
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            {loading ? "Loading..." : "Get Blogs"}
          </button>
        </form>

        {!loading && posts.length !== 0 && (
          <>
            <h2>{`@${userId}'s Medium Blogs`}</h2>
            <div className={styles.grid}>
              {posts.map(({ title, link, creator }, idx) => {
                return (
                  <a
                    href={link}
                    key={idx}
                    className={styles.card}
                    target="_blank"
                  >
                    <h3>{title} &rarr;</h3>
                    <p className={styles.subtitle}>{` by ${creator}`}</p>

                    <p>Still looking a way to parse the encoded Markdown 🥺.</p>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
