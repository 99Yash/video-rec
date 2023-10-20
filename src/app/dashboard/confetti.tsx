import ReactConfetti from 'react-confetti';
import useWindowSize from 'react-use/lib/useWindowSize';

const Confetti = () => {
  const { width, height } = useWindowSize();
  return <ReactConfetti width={width} height={height} />;
};

export default Confetti;
