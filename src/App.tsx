import styles from './App.module.scss';
import Game from './game';

const App = () => {
  return (
    <div className={styles.container}>
      <Game />
    </div>
  );
};

export default App;
