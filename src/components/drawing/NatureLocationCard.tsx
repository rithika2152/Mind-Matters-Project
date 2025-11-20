import React from 'react';
import { motion } from 'framer-motion';
import { NatureLocation } from '../../types/drawing';

interface NatureLocationCardProps {
  location: NatureLocation;
}

const NatureLocationCard: React.FC<NatureLocationCardProps> = ({ location }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md overflow-hidden"
    whileHover={{ y: -5 }}
  >
    <img
      src={location.imageUrl}
      alt={location.name}
      className="w-full h-48 object-cover"
    />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{location.name}</h3>
      <p className="text-gray-600 mb-4">{location.description}</p>
      <h4 className="font-medium text-gray-700 mb-2">Drawing Tips:</h4>
      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
        {location.tips.map((tip, tipIndex) => (
          <li key={tipIndex}>{tip}</li>
        ))}
      </ul>
    </div>
  </motion.div>
);

export default NatureLocationCard;