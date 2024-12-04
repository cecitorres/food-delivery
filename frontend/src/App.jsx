import "./styles.css";
import useFetch from "./useFetch";
import Checkout from "./Checkout";

export default function App() {
  const { data, isLoading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App flex-row center">
      {/* <h1>Posts</h1>
      <ul>
        {data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul> */}
      <Checkout />
    </div>
  );
}
