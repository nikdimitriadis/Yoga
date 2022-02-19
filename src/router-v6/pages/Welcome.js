import classes from "./Welcome.module.css";
import WelcomeLogo from "../../icons/Vector.png";
import LinkButtonStart from "../../components/UI/buttons/LinkButtonStart";
const Welcome = () => {
  return (
    <>
      <div className={classes.container}>
        <h3 className={classes.logo}>SILENT MOON</h3>
        <img src={WelcomeLogo} alt="welcome" />
        <h1>Hi Leon, welcome to Silent Moon</h1>
        <LinkButtonStart to="/home" styleName="big" text="Get started" />
      </div>
    </>
  );
};

export default Welcome;
