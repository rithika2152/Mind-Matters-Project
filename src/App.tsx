import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assessment from './pages/Assessment';
import AssessmentResult from './pages/AssessmentResult';
import Profile from './pages/Profile';
import Reports from './pages/Reports';
import Resources from './pages/Resources';
import Mindfulness from './pages/Mindfulness';
import Activities from './pages/Activities';
import Drawing from './pages/Drawing';
import Support from './pages/Support';
import { useUser } from './contexts/UserContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useUser();
  return currentUser ? <>{children}</> : <Navigate to="/" replace />;
};

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

function AppContent() {
  const { currentUser, logout } = useUser();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-50 bg-doodle-pattern">
      {currentUser && <Navbar onLogout={logout} />}
      <AnimatePresence mode="wait">
        <motion.main
          className="container mx-auto px-4 py-8"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={pageVariants}
        >
          <Routes>
            <Route 
              path="/" 
              element={currentUser ? <Navigate to="/dashboard" replace /> : <Login />} 
            />
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><Dashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/assessment" 
              element={<ProtectedRoute><Assessment /></ProtectedRoute>} 
            />
            <Route 
              path="/assessment/result" 
              element={<ProtectedRoute><AssessmentResult /></ProtectedRoute>} 
            />
            <Route 
              path="/profile" 
              element={<ProtectedRoute><Profile /></ProtectedRoute>} 
            />
            <Route 
              path="/reports" 
              element={<ProtectedRoute><Reports /></ProtectedRoute>} 
            />
            <Route 
              path="/resources" 
              element={<ProtectedRoute><Resources /></ProtectedRoute>} 
            />
            <Route 
              path="/mindfulness" 
              element={<ProtectedRoute><Mindfulness /></ProtectedRoute>} 
            />
            <Route 
              path="/activities" 
              element={<ProtectedRoute><Activities /></ProtectedRoute>} 
            />
            <Route 
              path="/drawing" 
              element={<ProtectedRoute><Drawing /></ProtectedRoute>} 
            />
            <Route 
              path="/support" 
              element={<ProtectedRoute><Support /></ProtectedRoute>} 
            />
          </Routes>
        </motion.main>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;