import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from './../../services/api';
import type { Project } from './../../types';
import { Modal } from './../../components/ui/Modal';
import { ProjectForm } from './../../components/forms/ProjectForm';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Estado para controlar se estamos editando e qual projeto é
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Erro ao buscar projetos", error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Função unificada para Salvar (Cria se não tiver ID, Atualiza se tiver)
  const handleSaveProject = async (formData: any) => {
    if (editingProject) {
      await updateProject(editingProject.id, formData);
    } else {
      await createProject(formData);
    }
    
    setIsModalOpen(false);
    setEditingProject(null);
    loadProjects();
  };

  // Abre o modal para edição preenchendo os dados
  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  // Abre o modal limpo para criação
  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteProject(id);
    loadProjects();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Projetos</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Novo Projeto
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{proj.title}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium inline-block my-1">
                  {proj.tech_stack}
                </span>
                <p className="text-gray-600 text-sm mt-1">{proj.description_1}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(proj)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(proj.id)}
                  className="text-gray-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); setEditingProject(null); }} 
        title={editingProject ? "Editar Projeto" : "Cadastrar Novo Projeto"}
      >
        <ProjectForm 
          initialData={editingProject} 
          onSubmit={handleSaveProject} 
          onCancel={() => { setIsModalOpen(false); setEditingProject(null); }} 
        />
      </Modal>
    </div>
  );
}