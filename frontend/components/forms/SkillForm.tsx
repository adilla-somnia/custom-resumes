import React, { useState, useEffect } from 'react';
import type { Skill } from '../../types';

interface SkillFormProps {
  initialData?: Skill | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const SkillForm: React.FC<SkillFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    category: '',
    items: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        category: initialData.category || '',
        items: initialData.items || ''
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Limpa campos vazios opcionais se preferir, ou manda direto
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <input
            type="text"
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: Visualização de Dados"
          />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Itens</label>
            <input
            type="text"
            name="items"
            required
            value={formData.items}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: Power BI, Plotly, Dash"
          />
      </div>


      <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors shadow-sm"
        >
          Salvar Skill
        </button>
      </div>
    </form>
  );
};