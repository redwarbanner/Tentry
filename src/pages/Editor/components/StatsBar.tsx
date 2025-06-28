interface StatsBarProps {
  content: string;
}

const StatsBar = ({ content }: StatsBarProps) => {
  if (!content) return null;

  const wordCount = content.split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="stats-bar">
      <span>
        <strong>Символов:</strong> {content.length} | <strong>Слов:</strong> {wordCount}
      </span>
      <span>Автосохранение активно</span>
    </div>
  );
};

export default StatsBar;
