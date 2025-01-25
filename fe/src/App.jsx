import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Index from './pages/index.jsx';
import Test from './pages/Test.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>
  );
}

export default App;
