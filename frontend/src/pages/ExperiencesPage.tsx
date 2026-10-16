import { useState, useEffect } from 'react';
import { createExperience, deleteExperience, getExperiences, updateExperience } from './../../services/api';
import type { Experience } from './../../types';
import { Modal } from './../../components/ui/Modal';
import { ExperienceForm } from './../../components/forms/ExperienceForm';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);

  const loadExperiences = async () => {
    try {
      const data = await getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error("Erro ao buscar experiências", error);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleSaveExperience = async (formData: any) => {
    if (editingExperience) {
      await updateExperience(editingExperience.id, formData);
    } else {
      await createExperience(formData);
    }
    
    setIsModalOpen(false);
    setEditingExperience(null);
    loadExperiences();
  };

  const handleOpenEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteExperience(id);
    loadExperiences();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Experiências</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Nova Experiência
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {experiences.map((exp: Experience) => (
            <div key={exp.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{exp.role} - {exp.company}{exp.city ? `, ${exp.city}` : ''}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium inline-block my-1">
                  {exp.start_date} - {exp.end_date ? exp.end_date : 'Atual'}
                </span>
                <p className="text-gray-600 text-sm mt-1">{exp.description_1}</p>
                {exp.description_2 ? <p className="text-gray-600 text-sm mt-1">{exp.description_2}</p> : ''}
                {exp.description_3 ? <p className="text-gray-600 text-sm mt-1">{exp.description_3}</p> : ''}
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(exp)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(exp.id)}
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
        onClose={() => { setIsModalOpen(false); setEditingExperience(null); }} 
        title={editingExperience ? "Editar Projeto" : "Cadastrar Novo Projeto"}
      >
        <ExperienceForm
          initialData={editingExperience} 
          onSubmit={handleSaveExperience} 
          onCancel={() => { setIsModalOpen(false); setEditingExperience(null); }} 
        />
      </Modal>
    </div>
  );
}