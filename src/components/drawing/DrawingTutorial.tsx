import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Palette } from 'lucide-react';
import VideoPlayer from './VideoPlayer';
import { DrawingTutorial as DrawingTutorialType } from '../../types/drawing';

interface DrawingTutorialProps {
  tutorial: DrawingTutorialType;
  isExpanded: boolean;
  onToggle: () => void;
}

const DrawingTutorial: React.FC<DrawingTutorialProps> = ({ tutorial, isExpanded, onToggle }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{tutorial.title}</h3>
            <p className="text-gray-600 mt-1">{tutorial.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
              {tutorial.difficulty}
            </span>
            <div className="flex items-center text-gray-500">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">{tutorial.timeNeeded}</span>
            </div>
          </div>
        </div>

        <button
          onClick={onToggle}
          className="w-full text-left"
        >
          <div className="flex items-center space-x-2 text-primary-600">
            <Palette className="h-5 w-5" />
            <span>{isExpanded ? 'Hide Details' : 'Show Details'}</span>
          </div>
        </button>

        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 space-y-6"
          >
            <div>
              <h4 className="font-medium text-gray-800 mb-2">Materials Needed:</h4>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                {tutorial.materials.map((material, index) => (
                  <li key={index}>{material}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-4">Video Tutorials:</h4>
              {tutorial.tutorials.map((videoTutorial, index) => (
                <div key={index} className="mb-4">
                  <h5 className="text-gray-700 mb-2">{videoTutorial.title}</h5>
                  <VideoPlayer tutorial={videoTutorial} />
                </div>
              ))}
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-4">Step by Step Guide:</h4>
              <div className="space-y-4">
                {tutorial.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h5 className="font-medium text-gray-800">Step {index + 1}: {step.title}</h5>
                    <p className="text-gray-600 mt-1">{step.description}</p>
                    <p className="text-sm text-primary-600 mt-2">Tip: {step.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-800 mb-4">Example Results:</h4>
              <div className="grid grid-cols-2 gap-4">
                {tutorial.examples.map((example, index) => (
                  <img
                    key={index}
                    src={example}
                    alt={`${tutorial.title} example ${index + 1}`}
                    className="rounded-lg shadow-sm w-full h-48 object-cover"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DrawingTutorial;