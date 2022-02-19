import { useState, useEffect } from "react";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../UI/spinner/LoadingSpinner";
import Card from "../UI/Card/Card";

const DataLocalStorage = () => {
  const [fetchedMusic, setFetchedMusic] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/fav");

        setFetchedMusic(() => responseData.list);
      } catch (e) {}
    };

    fetchedData();
    console.log("favorite");
  }, [sendRequest]);

  console.log(fetchedMusic);

  let content;

  if (error) {
    content = <h1>cant fetch data</h1>;
  }

  if (!error && isLoading) {
    content = <LoadingSpinner asOverlay />;
  }

  if (!error && !isLoading && fetchedMusic.length === 0) {
    console.log("no data");
    content = <p>no favorites added</p>;
  }

  if (!error && !isLoading && fetchedMusic.length !== 0) {
    console.log(fetchedMusic.length);
    content = fetchedMusic?.map((list, index) => {
      return (
        <Card
          to={list?.id}
          // src={list.images[0]?.url}
          src={list?.src}
          name={list?.name}
          key={index}
        />
      );
    });
  }

  return <>{content}</>;
};

export default DataLocalStorage;
