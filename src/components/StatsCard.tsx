import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  color: string;
  onClick?: () => void; 
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const StatsCard = ({ title, value, color, onClick }: StatsCardProps) => (
  <motion.div
    variants={item}
    whileHover={{ y: -5, cursor: "pointer" }}
    onClick={onClick}
    className={`p-6 rounded-3xl ${color.includes('from') ? `bg-gradient-to-r ${color}` : color} shadow-lg`}
  >
    <p className="text-sm font-medium opacity-80 uppercase tracking-wider">{title}</p>
    <div className="flex items-end justify-between mt-2">
      <h2 className="text-4xl font-bold">{value}</h2>
      <div className="h-2 w-16 bg-white/20 rounded-full overflow-hidden">
        <div className="h-full bg-white/40 w-2/3" />
      </div>
    </div>
  </motion.div>
);

export default StatsCard;