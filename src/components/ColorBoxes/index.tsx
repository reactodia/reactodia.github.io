import styles from './styles.module.css';

export function ColorBoxes(props: { colors: readonly string[] }) {
  const {colors} = props;
  return (
    <div className={styles.component}>
      {colors.map(color => (
        <div key={color}
          style={{background: color}}
          title={color}
        />
      ))}
    </div>
  );
}
