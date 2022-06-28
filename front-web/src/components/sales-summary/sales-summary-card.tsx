import './styles.css';

type Props = {
  icon: React.ReactNode;
  value: number;
  label: string;
};

function SalesSummaryCard(props: Props) {
  const { icon, value, label } = props;

  return (
    <div className="sales-summary-card base-card">
      {icon}
      <h3 className="sales-summary-card-value">{value}</h3>
      <span className="sales-summary-card-label">{label}</span>
    </div>
  );
}

export default SalesSummaryCard;
