import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawingTutorial } from '../../types/drawing';
import VideoPlayer from './VideoPlayer';

interface DrawingCardProps {
  drawing: DrawingTutorial;
  isExpanded: boolean;
  onToggle: () => void;
}

const DrawingCard: React.FC<DrawingCardProps> = ({ drawing, isExpanded, onToggle }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md overflow-hidden"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{drawing.title}</h2>
            <p className="text-gray-600 mb-4">{drawing.description}</p>
            <div className="flex space-x-4">
              <span className="text-sm text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {drawing.difficulty}
              </span>
              <span className="text-sm text-gray-500">
                {drawing.timeNeeded}
              </span>
            </div>
          </div>
          {isExpanded ? (
            <ChevronUp className="h-6 w-6 text-gray-400" />
          ) : (
            <ChevronDown className="h-6 w-6 text-gray-400" />
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-100"
          >
            <div className="p-6">
              <div className="mb-8">
                <h3 className="font-medium text-gray-700 mb-4">Video Tutorials:</h3>
                <div className="grid grid-cols-1 gap-6">
                  {drawing.tutorials.map((tutorial, index) => (
                    <div key={index}>
                      <h4 className="font-medium text-gray-800 mb-2">{tutorial.title}</h4>
                      <VideoPlayer tutorial={tutorial} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Materials Needed:</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  {drawing.materials.map((material, index) => (
                    <li key={index}>{material}</li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-4">Step by Step Process:</h3>
                <div className="space-y-4">
                  {drawing.steps.map((step, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-800 mb-2">
                        Step {index + 1}: {step.title}
                      </h4>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <p className="text-sm text-primary-600">
                        Tip: {step.tip}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {drawing.resources && (
                <div className="mb-6">
                  <h3 className="font-medium text-gray-700 mb-4">Additional Resources:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drawing.resources.map((resource, index) => (
                      <a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <h4 className="font-medium text-primary-600 mb-2">{resource.title}</h4>
                        <p className="text-sm text-gray-600">{resource.description}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium text-gray-700 mb-4">Example Results:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {drawing.examples.map((example, index) => (
                    <img
                      key={index}
                      src={example}
                      alt={`${drawing.title} example ${index + 1}`}
                      className="rounded-lg shadow-sm w-full h-48 object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DrawingCard;