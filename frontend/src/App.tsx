import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import Home from './pages/Home';
import BuildResumePage from './pages/BuildResumePage';

export default function App() {
  return (
    <Router>
      <div className="max-w-screen h-fit min-h-screen bg-gray-950">
        {/* Menu de Navegação Superior */}
        <nav className="bg-taupe-900 border-b border-gray-200 px-6 flex justify-between items-center shadow-xs">
          <Link to="/" >
            <h1 className="font-semibold text-lg text-white shadow-amber-50 shadow-xs hover:shadow-xl duration-300 transition-discrete rounded-2xl p-1">Gerenciador de Currículos</h1>
          </Link>
          <div className="flex gap-4">
            <Link to="/resumes" className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
              Ver Currículos
            </Link>
            <Link to="/build-resume" className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
              Montar Currículo
            </Link>
          </div>
        </nav>

        {/* Área onde as páginas vão carregar de acordo com a URL */}
        <main className="p-4">
          <Routes>
            <Route path="/resumes" element={<ResumeBuilderPage />} />
            <Route path="/build-resume" element={<BuildResumePage />} />
            <Route path="/" element={<Home />} /> {/* Página padrão */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}