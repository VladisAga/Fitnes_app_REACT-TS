import Lottie from 'react-lottie';
import animationData from './loader.json';
import styles from './Loader.module.scss';

interface ILoader {
  isLoading: boolean;
}

const Loader: React.FC<ILoader> = ({ isLoading }) => {

  return (
    <div data-test-id='loader' className={styles.back} style={!isLoading ? { display: 'none' } : {}}>
      <Lottie
        isClickToPauseDisabled
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
        height={200}
        width={200}
        options={{
          animationData: animationData,
          loop: true,
          autoplay: true,
        }}
      />
    </div>
  );
};

export default Loader;
