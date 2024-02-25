import Lottie from 'react-lottie';
import animationData from './loader.json';
import styles from './Loader.module.scss';
import { RootState } from '@redux/configure-store';
import { useSelector } from 'react-redux';


const Loader = () => {
  const isLoading = useSelector((state: RootState) => state.isLoading.isLoading);
  return (
    <div className={styles.back} hidden={!isLoading}>
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
