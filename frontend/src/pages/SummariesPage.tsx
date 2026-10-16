import { useState, useEffect } from 'react';
import { createSummary, deleteSummary, getSummaries, updateSummary } from '../../services/api';
import type { Summary } from '../../types';
import { Modal } from '../../components/ui/Modal';
import { SummaryForm } from '../../components/forms/SummaryForm';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function SummariesPage() {
  const [summaries, setSummaries] = useState<Summary[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingSummary, setEditingSummary] = useState<Summary | null>(null);

  const loadSummaries = async () => {
    try {
      const data = await getSummaries();
      setSummaries(data);
    } catch (error) {
      console.error("Erro ao buscar resumos", error);
    }
  };

  useEffect(() => {
    loadSummaries();
  }, []);

  const handleSaveSummary = async (formData: any) => {
    if (editingSummary) {
      await updateSummary(editingSummary.id, formData);
    } else {
      await createSummary(formData);
    }
    
    setIsModalOpen(false);
    setEditingSummary(null);
    loadSummaries();
  };

  const handleOpenEdit = (summary: Summary) => {
    setEditingSummary(summary);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingSummary(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteSummary(id);
    loadSummaries();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Resumos</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Novo Resumo
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {summaries.map((summary: Summary) => (
            <div key={summary.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{summary.title}</h3>
                <p className="text-gray-600 text-sm mt-1 ">{summary.summary}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(summary)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(summary.id)}
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
        onClose={() => { setIsModalOpen(false); setEditingSummary(null); }} 
        title={editingSummary ? "Editar Resumo" : "Cadastrar Novo Resumo"}
      >
        <SummaryForm
          initialData={editingSummary} 
          onSubmit={handleSaveSummary} 
          onCancel={() => { setIsModalOpen(false); setEditingSummary(null); }} 
        />
      </Modal>
    </div>
  );
}