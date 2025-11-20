import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BackButtonProps {
  to?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className="mb-6 flex items-center text-primary-600 hover:text-primary-700"
      whileHover={{ x: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      Back
    </motion.button>
  );
};

export default BackButton;