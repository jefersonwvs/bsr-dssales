import './styles.css';

import SalesSummaryCard from './sales-summary-card';

import { ReactComponent as DoneIcon } from '../../assets/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/sync-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/bar-chart-icon.svg';
import { ReactComponent as AvatarIcon } from '../../assets/avatar-icon.svg';
import { FilterData, SalesSummaryData } from '../../types';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../utils/request';

type Props = {
  filterData?: FilterData;
};

function SalesSummary(props: Props) {
  const { filterData } = props;

  const [summary, setSummary] = useState<SalesSummaryData>({
    min: 0,
    max: 0,
    avg: 0,
    count: 0,
  });

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest
      .get<SalesSummaryData>('/sales/summary', { params })
      .then((response) => {
        setSummary(response.data);
      })
      .catch(() => {
        console.error('Error to fetch sales summary');
      });
  }, [params]);

  return (
    <div className="sales-summary-container">
      <SalesSummaryCard
        icon={<DoneIcon />}
        value={summary?.avg?.toFixed(2)}
        label="Média"
      />
      <SalesSummaryCard
        icon={<SyncIcon />}
        value={summary?.count}
        label="Quantidade"
      />
      <SalesSummaryCard
        icon={<BarChartIcon />}
        value={summary?.min?.toFixed(2)}
        label="Mínima"
      />
      <SalesSummaryCard
        icon={<AvatarIcon />}
        value={summary?.max?.toFixed(2)}
        label="Máxima"
      />
    </div>
  );
}

export default SalesSummary;
