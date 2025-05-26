import loadingSVG from "../../../public/loading.svg";

const LoadingSpinner = () => {
  return (
    <div style={{ textAlign: "center", margin: "2rem" }}>
      <img src={loadingSVG} alt="Loading..." width={50} />
      <p>Loading...</p>
    </div>
  );
};

export default LoadingSpinner;
