import { useState, useEffect, useContext } from "react";

import TokenContent from "../../store/token-provider";
import Logo from "../../components/UI/Logo";
import LoadingSpinner from "../../components/UI/spinner/LoadingSpinner";
import Card from "../../components/UI/Card/Card";
import Pcard from "../../components/UI/Pcard";
import MoveList from "../../components/UI/MoveList";
import Footer from "../../components/footer/Footer";
import { useHttpClient } from "../../hooks/http-hook";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import classes from "./Home.module.css";

const Home = () => {
  const [fetchedYogaMusic, setFetchedYogaMusic] = useState([]);
  const [fetchedMediMusic, setFetchedMediMusic] = useState([]);
  const [fetchedFavMusic, setFetchedFavMusic] = useState([]);
  const { isLoading, error, sendRequest } = useHttpClient();
  const tokenCtx = useContext(TokenContent);

  let favoriteListContent;
  let swiperFavContent;
  let swiperMediContent;
  let swiperYogaContent;

  useEffect(() => {
    // fetch fur yoga data
    const fetchedYogaData = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/all");
        setFetchedYogaMusic(responseData.music);
      } catch (e) {}
    };
    // fetch fur meditation
    const fetchedMediData = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/all");
        setFetchedMediMusic(responseData.music);
      } catch (e) {}
    };

    // fetch fur fave data
    const fetchedFavData = async () => {
      try {
        const responseData = await sendRequest("http://localhost:5000/fav");

        setFetchedFavMusic(() => responseData.list);
      } catch (e) {}
    };

    fetchedYogaData();
    fetchedFavData();
    fetchedMediData();
  }, [sendRequest]);

  console.log(fetchedFavMusic);

  if (fetchedFavMusic.length === 0) {
    favoriteListContent = <p>You dont have favevorites</p>;
  } else {
    favoriteListContent = fetchedFavMusic?.map((list, index) => {
      console.log(list.src);
      return (
        <SwiperSlide key={index} tag="li">
          <Card
            to={list.id}
            /*src={list.images[0]?.url}*/ /*src={list.src}*/
            src={list.src}
            name={list?.name}
          />
        </SwiperSlide>
      );
    });

    swiperFavContent = (
      <MoveList spaceBetween={20} slidesPerView={2}>
        {favoriteListContent}
      </MoveList>
    );
  }

  swiperYogaContent = (
    <MoveList spaceBetween={150} slidesPerView={3}>
      {fetchedYogaMusic.length !== 0 &&
        fetchedYogaMusic?.map((list, index) => {
          return (
            <SwiperSlide key={index} tag="li">
              <Card
                to={list.id}
                /*src={list.images[0]?.url}*/ src={list.images[0]?.url}
                name={list?.name}
              />
            </SwiperSlide>
          );
        })}
    </MoveList>
  );

  swiperMediContent = (
    <MoveList spaceBetween={150} slidesPerView={3}>
      {fetchedMediMusic.length !== 0 &&
        fetchedMediMusic?.map((list, index) => {
          return (
            <SwiperSlide key={index} tag="li">
              <Card to={list.id} src={list.images[0]?.url} name={list?.name} />
            </SwiperSlide>
          );
        })}
    </MoveList>
  );

  return (
    <>
      <Logo />
      <Pcard>
        {error && <h1>Cant Find Data :/</h1>}
        {!error && isLoading && <LoadingSpinner asOverlay />}
        {!error && !isLoading && (
          <>
            <h2>{`Good morning ${tokenCtx.name}`}</h2>
            <p className={classes.par}>We hope you have a good day</p>
            <div className={classes.recommented}>
              <h3>Favorite List</h3>
              {swiperFavContent}
            </div>
            <div className={classes.recommented}>
              <h3>Recomended Yoga for you</h3>
              {swiperYogaContent}
            </div>
            <div className={` ${classes.last}`}>
              <h3>Recomended Meditation for you</h3>
              {swiperMediContent}
            </div>
          </>
        )}
      </Pcard>
      <Footer />
    </>
  );
};

export default Home;
