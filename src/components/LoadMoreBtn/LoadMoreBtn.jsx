import PropTypes from "prop-types";

const LoadMoreButton = ({ onClick }) => {
  return <button onClick={onClick}>Load More</button>;
};

LoadMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default LoadMoreButton;
