import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProjectsPage from './pages/ProjectsPage';
import ResumeBuilderPage from './pages/ResumeBuilderPage';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <div className="max-w-screen h-fit min-h-screen bg-gray-950">
        {/* Menu de Navegação Superior */}
        <nav className="bg-taupe-900 border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-xs">
          <Link to="/" >
            <h1 className="font-bold text-lg text-indigo-700 shadow-amber-50 shadow-2xl">Gerenciador de Currículos</h1>
          </Link>
          <div className="flex gap-4">
            <Link to="/projects" className="text-white hover:text-indigo-600 font-medium transition-colors">
              Gerenciar Projetos
            </Link>
            <Link to="/resumes" className="text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg font-medium transition-colors">
              Montar Currículo
            </Link>
          </div>
        </nav>

        {/* Área onde as páginas vão carregar de acordo com a URL */}
        <main className="p-8">
          <Routes>
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/resumes" element={<ResumeBuilderPage />} />
            <Route path="/" element={<Home />} /> {/* Página padrão */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}