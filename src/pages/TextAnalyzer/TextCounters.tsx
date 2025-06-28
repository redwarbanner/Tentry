import styles from './styles.module.css';

interface Props {
  text: string;
}

const TextCounters = ({ text }: Props) => {
  const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className={styles.counterBox}>
      <strong>Символов:</strong> {text.length} | <strong>Слов:</strong> {wordCount}
    </div>
  );
};

export default TextCounters;
