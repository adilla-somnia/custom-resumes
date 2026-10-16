import { useState, useEffect } from 'react';
import { createSkill, deleteSkill, getSkills, updateSkill } from '../../services/api';
import type { Skill } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { SkillForm } from '../../components/forms/SkillForm';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const loadSkills = async () => {
    try {
      const data = await getSkills();
      setSkills(data);
    } catch (error) {
      console.error("Erro ao buscar skills", error);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleSaveSkill = async (formData: any) => {
    if (editingSkill) {
      await updateSkill(editingSkill.id, formData);
    } else {
      await createSkill(formData);
    }
    
    setIsModalOpen(false);
    setEditingSkill(null);
    loadSkills();
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingSkill(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteSkill(id);
    loadSkills();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Skills</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Nova Skill
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {skills.map((skill: Skill) => (
            <div key={skill.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{skill.category}</h3>
                <p className="text-gray-600 text-sm mt-1 ">{skill.items}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(skill)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(skill.id)}
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
        onClose={() => { setIsModalOpen(false); setEditingSkill(null); }} 
        title={editingSkill ? "Editar Skill" : "Cadastrar Nova Skill"}
      >
        <SkillForm
          initialData={editingSkill} 
          onSubmit={handleSaveSkill} 
          onCancel={() => { setIsModalOpen(false); setEditingSkill(null); }} 
        />
      </Modal>
    </div>
  );
}