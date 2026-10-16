import { useState, useEffect } from 'react';
import { createLanguage, deleteLanguage, getLanguages, updateLanguage } from '../../services/api';
import type { Language } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { LanguageForm } from '../../components/forms/LanguageForm';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function LanguagesPage() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);

  const loadLanguages = async () => {
    try {
      const data = await getLanguages();
      setLanguages(data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    loadLanguages();
  }, []);

  const handleSaveLanguage = async (formData: any) => {
    if (editingLanguage) {
      await updateLanguage(editingLanguage.id, formData);
    } else {
      await createLanguage(formData);
    }
    
    setIsModalOpen(false);
    setEditingLanguage(null);
    loadLanguages();
  };

  const handleOpenEdit = (language: Language) => {
    setEditingLanguage(language);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingLanguage(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteLanguage(id);
    loadLanguages();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Idiomas</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Novo Idioma
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {languages.map((language: Language) => (
            <div key={language.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{language.language} {language.level}</h3>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(language)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(language.id)}
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
        onClose={() => { setIsModalOpen(false); setEditingLanguage(null); }} 
        title={editingLanguage ? "Editar Idioma" : "Cadastrar Novo Idioma"}
      >
        <LanguageForm
          initialData={editingLanguage} 
          onSubmit={handleSaveLanguage} 
          onCancel={() => { setIsModalOpen(false); setEditingLanguage(null); }} 
        />
      </Modal>
    </div>
  );
}