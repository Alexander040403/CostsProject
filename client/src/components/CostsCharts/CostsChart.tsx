import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { ICost } from '../../types';
import './styles.css'

Chart.register(...registerables);

type ChartType = 'line' | 'bar';

interface CostsChartProps {
  costs: ICost[];
}

export const CostsChart = ({ costs }: CostsChartProps) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [chartType, setChartType] = useState<ChartType>('line');

  useEffect(() => {
    if (!chartRef.current) return;

    // Группируем расходы по дате
    const costsByDate: Record<string, number> = {};
    costs.forEach(cost => {
      const date = new Date(cost.date).toLocaleDateString();
      costsByDate[date] = (costsByDate[date] || 0) + cost.price;
    });

    const dates = Object.keys(costsByDate);
    const amounts = Object.values(costsByDate);

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(chartRef.current, {
      type: chartType,
      data: {
        labels: dates,
        datasets: [{
          label: 'Сумма расходов',
          data: amounts,
          backgroundColor: chartType === 'bar' 
            ? 'rgba(54, 162, 235, 0.7)' 
            : 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: chartType === 'bar' ? 0 : 2,
          borderRadius: chartType === 'bar' ? 4 : 0,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: { display: true, text: 'Сумма (руб)' }
          },
          x: {
            title: { display: true, text: 'Дата' }
          }
        }
      }
    });

    return () => {
      chartInstance.current?.destroy();
    };
  }, [costs, chartType]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
      <div className="chart-toggle-buttons">
        <button 
          onClick={() => setChartType('line')}
          className={`chart-toggle-btn ${chartType === 'line' ? 'active' : ''}`}
        >
          график
        </button>
        <button 
          onClick={() => setChartType('bar')}
          className={`chart-toggle-btn ${chartType === 'bar' ? 'active' : ''}`}
        >
          диаграмма
        </button>
      </div>
    </div>
  );
};