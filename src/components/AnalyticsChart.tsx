import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', tasks: 2 },
  { name: 'Tue', tasks: 5 },
  { name: 'Wed', tasks: 3 },
  { name: 'Thu', tasks: 8 },
  { name: 'Fri', tasks: 6 },
  { name: 'Sat', tasks: 4 },
  { name: 'Sun', tasks: 9 },
];

const AnalyticsChart = () => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-3xl h-[400px] w-full">
      <h3 className="text-lg font-semibold mb-4 text-white">Weekly Productivity</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 12}} 
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{fill: '#64748b', fontSize: 12}} 
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '10px' }}
            itemStyle={{ color: '#3b82f6' }}
          />
          <Area 
            type="monotone" 
            dataKey="tasks" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorTasks)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;