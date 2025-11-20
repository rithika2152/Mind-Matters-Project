import React, { useState } from 'react';
import { Palette, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import BackButton from '../components/BackButton';
import DrawingTutorial from '../components/drawing/DrawingTutorial';
import { drawingTutorials, natureLocations } from '../data/drawingTutorials';

const Drawing = () => {
  const [expandedDrawing, setExpandedDrawing] = useState<string | null>(null);

  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <BackButton to="/activities" />
      
      <div className="text-center mb-8">
        <Palette className="h-12 w-12 text-primary-600 mx-auto mb-2" />
        <h1 className="text-3xl font-bold text-gray-800">Calming Drawing Ideas</h1>
        <p className="text-gray-600">Simple and relaxing drawings to help you unwind</p>
      </div>

      <div className="space-y-6 mb-12">
        {drawingTutorials.map((tutorial) => (
          <DrawingTutorial
            key={tutorial.id}
            tutorial={tutorial}
            isExpanded={expandedDrawing === tutorial.id}
            onToggle={() => setExpandedDrawing(expandedDrawing === tutorial.id ? null : tutorial.id)}
          />
        ))}
      </div>

      <motion.section
        className="mt-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <MapPin className="h-6 w-6 mr-2 text-primary-600" />
          Nature Drawing Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {natureLocations.map((location, index) => (
            <motion.div
              key={index}
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
          ))}
        </div>
      </motion.section>

      <motion.div 
        className="mt-8 bg-white p-6 rounded-xl shadow-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">General Drawing Tips</h2>
        <ul className="space-y-2 text-gray-600">
          <li>• Take your time and focus on the process, not the result</li>
          <li>• Start with light strokes that can be easily adjusted</li>
          <li>• Remember to breathe and stay relaxed while drawing</li>
          <li>• Don't aim for perfection - embrace imperfections</li>
          <li>• If you feel stuck, take a short break and return fresh</li>
        </ul>
      </motion.div>
    </motion.div>
  );
};

export default Drawing;