import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useHttpClient } from "../../hooks/http-hook";
import LoadingSpinner from "../../components/UI/spinner/LoadingSpinner";

// comps
import LidBackground from "../../components/UI/MusicList/LidBackground";
import LidDescr from "../../components/UI/MusicList/LidDescr";
import Pcard from "../../components/UI/Pcard";
import LidTrackList from "../../components/UI/MusicList/LidTrackList";
import Modal from "../../components/modal/Modal";
import ModalAudio from "../../components/modal/ModalAudio";

import classes from "./MusicList.module.css";
import ButtonsDiv from "../../components/UI/buttons/ButtonsDiv";
import Footer from "../../components/footer/Footer";

const MusicList = () => {
  const [fetchedMusic, setFetchedMusic] = useState();
  const [modalState, setModalState] = useState(false);
  const [audioData, setAudioData] = useState();
  const { isLoading, error, sendRequest } = useHttpClient();
  const lid = useParams().lid;
  // console.log(lid);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/all/${lid}`
        );
        console.log(responseData);
        setFetchedMusic(responseData.products);
      } catch (e) {}
    };

    fetchedData();
  }, [sendRequest, lid]);

  const dataOnModal = (data) => {
    setModalState(true);
    document.body.style.overflow = "hidden";
    setAudioData(data);
  };

  const dataOffModal = () => {
    setModalState(false);
    document.body.style.overflow = "scroll";
  };

  const firstClick = () => {
    navigate(-1);
  };

  const secondClick = async () => {
    try {
      await sendRequest(
        "http://localhost:5000/fav",
        "POST",
        JSON.stringify({
          id: fetchedMusic?.body.id,
          src: fetchedMusic?.body.images[0].url,
          name: fetchedMusic?.body.name,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (e) {}

    console.log(fetchedMusic.body);
    console.log(fetchedMusic?.body.id);
    console.log(fetchedMusic?.body.images[0].url);
    console.log(fetchedMusic?.body.name);
  };

  return (
    <>
      {modalState && !!audioData && (
        <Modal bgImg={audioData.bgImg}>
          <ModalAudio data={audioData} onClick={dataOffModal} />
        </Modal>
      )}

      <div className={classes.bgContainer}>
        <ButtonsDiv
          firstType="back"
          secondType="fav"
          firstClick={firstClick}
          secondClick={secondClick}
        />
        <LidBackground src={fetchedMusic?.body.images[0].url} />
      </div>
      <Pcard>
        {error && <h1>Cant Find Data :/</h1>}
        {isLoading && !error && <LoadingSpinner asOverlay />}
        {!error && !isLoading && (
          <>
            <LidDescr
              // STATT LIST fetchedMusic
              followers={fetchedMusic?.body.followers.total}
              name={fetchedMusic?.body?.name}
              description={fetchedMusic?.body?.description}
            />
            <LidTrackList
              onClick={dataOnModal}
              tracks={fetchedMusic?.body.tracks.items}
            />
          </>
        )}
      </Pcard>

      <Footer />
    </>
  );
};

export default MusicList;
