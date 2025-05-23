import loadingSVG from "../../assets/loading.svg"; // adjust the path based on location

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <img src={loadingSVG} alt="Loading..." width={50} />
      <p>Loading...</p>s
    </div>
  );
};

export default LoadingSpinner;
