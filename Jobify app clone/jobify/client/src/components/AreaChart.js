import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

function AreaChartContainer({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimal={false} />
        <Tooltip />
        <Area dataKey="count" fill="#bef8fd" stroke="#2cb1bc" type="monotone" />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AreaChartContainer;
