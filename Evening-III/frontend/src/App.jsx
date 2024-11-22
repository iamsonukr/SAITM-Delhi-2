import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blogs from './pages/Blogs/Blogs';
import Create from './pages/Create/Create';
import Update from './pages/Update/Update'; // Ensure you have this component created
import './App.css';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/create" element={<Create />} />
        <Route path={`/update/:id`} element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
