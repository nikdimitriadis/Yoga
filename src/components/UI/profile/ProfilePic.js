import classes from "./ProfilePic.module.css";

const ProfilePic = (props) => {
  return (
    <div className={classes.container}>
      <div>
        <img
          src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1972&q=80"
          alt="face"
        />
      </div>
      <h1>Leo</h1>
    </div>
  );
};

export default ProfilePic;
