import React, { useMemo } from 'react';
import type { Deputy } from '../types';

interface SeatDistributionChartProps {
  deputies: Deputy[];
}

// Simple hash function to generate a color from a string (party name)
// This ensures consistent colors for each party without a predefined map
const stringToColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xFF;
    color += ('00' + value.toString(16)).substr(-2);
  }
  return color;
};

const SeatDistributionChart: React.FC<SeatDistributionChartProps> = ({ deputies }) => {
  const partyDistribution = useMemo(() => {
    if (!deputies.length) return [];

    const counts: { [key: string]: number } = {};
    deputies.forEach(deputy => {
      counts[deputy.party] = (counts[deputy.party] || 0) + 1;
    });

    return Object.entries(counts)
      .map(([party, seats]) => ({
        party,
        seats,
        percentage: (seats / deputies.length) * 100,
        color: stringToColor(party),
      }))
      .sort((a, b) => b.seats - a.seats); // Sort from most to least seats
  }, [deputies]);

  if (!partyDistribution.length) {
    return null;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h3 className="text-xl font-bold text-slate-800 mb-3 text-center">Composição da Câmara</h3>
      <div className="flex w-full h-8 rounded-lg overflow-hidden" role="progressbar" aria-valuenow={513} aria-valuemin={0} aria-valuemax={513}>
        {partyDistribution.map(({ party, percentage, color, seats }) => (
          <div
            key={party}
            className="h-full"
            style={{ width: `${percentage}%`, backgroundColor: color }}
            title={`${party}: ${seats} assento(s)`}
          >
            <span className="sr-only">{`${party}: ${seats} assento(s)`}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 text-sm text-slate-600">
        {partyDistribution.slice(0, 10).map(({ party, color, seats }) => (
          <div key={party} className="flex items-center">
            <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: color }}></span>
            <span>{party} ({seats})</span>
          </div>
        ))}
         {partyDistribution.length > 10 && (
            <div className="font-semibold">... e outros</div>
         )}
      </div>
    </div>
  );
};

export default SeatDistributionChart;
