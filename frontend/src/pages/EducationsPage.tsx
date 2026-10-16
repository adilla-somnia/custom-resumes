import { useState, useEffect } from 'react';
import { createEducation, deleteEducation, getEducations, updateEducation } from './../../services/api';
import type { Education } from './../../types';
import { Modal } from './../../components/ui/Modal';
import { EducationForm } from './../../components/forms/EducationForm';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function EducationsPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);

  const loadEducations = async () => {
    try {
      const data = await getEducations();
      setEducations(data);
    } catch (error) {
      console.error("Erro ao buscar formações", error);
    }
  };

  useEffect(() => {
    loadEducations();
  }, []);

  const handleSaveEducation = async (formData: any) => {
    if (editingEducation) {
      await updateEducation(editingEducation.id, formData);
    } else {
      await createEducation(formData);
    }
    
    setIsModalOpen(false);
    setEditingEducation(null);
    loadEducations();
  };

  const handleOpenEdit = (education: Education) => {
    setEditingEducation(education);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingEducation(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteEducation(id);
    loadEducations();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Formações</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Nova Formação
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {educations.map((ed: Education) => (
            <div key={ed.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{ed.degree} - {ed.institution}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium inline-block my-1">
                  {ed.start_date} - {ed.end_date ? ed.end_date : 'Atual'}
                </span>
                <p className="text-gray-600 text-sm mt-1">Finalizado: {ed.finished ? 'Sim' : 'Não'}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(ed)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(ed.id)}
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
        onClose={() => { setIsModalOpen(false); setEditingEducation(null); }} 
        title={editingEducation ? "Editar Formação" : "Cadastrar Nova Formação"}
      >
        <EducationForm
          initialData={editingEducation} 
          onSubmit={handleSaveEducation} 
          onCancel={() => { setIsModalOpen(false); setEditingEducation(null); }} 
        />
      </Modal>
    </div>
  );
}