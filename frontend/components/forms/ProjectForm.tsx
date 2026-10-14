import React, { useState, useEffect } from 'react';
import { Project } from '../../types';

interface ProjectFormProps {
  initialData?: Project | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    tech_stack: '',
    description_1: '',
    description_2: '',
    description_3: '',
    link_1: '',
    link_1_title: '',
    link_2: '',
    link_2_title: '',
    link_3: '',
    link_3_title: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        tech_stack: initialData.tech_stack || '',
        description_1: initialData.description_1 || '',
        description_2: initialData.description_2 || '',
        description_3: initialData.description_3 || '',
        link_1: initialData.link_1 || '',
        link_1_title: initialData.link_1_title || '',
        link_2: initialData.link_2 || '',
        link_2_title: initialData.link_2_title || '',
        link_3: initialData.link_3 || '',
        link_3_title: initialData.link_3_title || '',
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Limpa campos vazios opcionais se preferir, ou manda direto
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título do Projeto</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: Plataforma de Analytics"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack</label>
          <input
            type="text"
            name="tech_stack"
            required
            value={formData.tech_stack}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: React, FastAPI, Tailwind"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descrição principal (Obrigatória)</label>
        <textarea
          name="description_1"
          required
          rows={2}
          value={formData.description_1}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder="O que o projeto faz..."
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição 2 (Opcional)</label>
          <textarea
            name="description_2"
            rows={2}
            value={formData.description_2}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição 3 (Opcional)</label>
          <textarea
            name="description_3"
            rows={2}
            value={formData.description_3}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título do Link 1</label>
          <input
            type="text"
            name="link_1_title"
            required
            value={formData.link_1_title}
            onChange={handleChange}
            placeholder="Ex: Repositório GitHub"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"
          />
          <input
            type="url"
            name="link_1"
            required
            value={formData.link_1}
            onChange={handleChange}
            placeholder="https://github.com/..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título do Link 2 (Opcional)</label>
          <input
            type="text"
            name="link_2_title"
            value={formData.link_2_title}
            onChange={handleChange}
            placeholder="Ex: Demo ao Vivo"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"
          />
          <input
            type="url"
            name="link_2"
            value={formData.link_2}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título do Link 3 (Opcional)</label>
          <input
            type="text"
            name="link_3_title"
            value={formData.link_3_title}
            onChange={handleChange}
            placeholder="Ex: Portfolio"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"
          />
          <input
            type="url"
            name="link_2"
            value={formData.link_3}
            onChange={handleChange}
            placeholder="https://..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>
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
          Salvar Projeto
        </button>
      </div>
    </form>
  );
};