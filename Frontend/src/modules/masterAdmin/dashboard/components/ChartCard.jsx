import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

const ChartCard = ({ title, data, type = "line", xKey, dataKey }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="mb-4 font-semibold">{title}</h2>

      <ResponsiveContainer width="100%" height={250}>
        {type === "line" ? (
          <LineChart data={data}>
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Line dataKey={dataKey} />
          </LineChart>
        ) : (
          <BarChart data={data}>
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={dataKey} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartCard;