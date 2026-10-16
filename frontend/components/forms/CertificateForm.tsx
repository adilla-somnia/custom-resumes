import React, { useState, useEffect } from 'react';
import type { Certificate } from '../../types';

interface CertificateFormProps {
  initialData?: Certificate | null;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export const CertificateForm: React.FC<CertificateFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    institution: '',
    title: '',
    kind: '',
    start_date: '',
    end_date: '',
    finished: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        institution: initialData.institution || '',
        title: initialData.title || '',
        kind: initialData.kind || '',
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        finished: initialData.finished || false
      });
    }
  }, [initialData]);

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
    const { name, type, value, checked } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
    }));
    };


  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    // Limpa campos vazios opcionais se preferir, ou manda direto
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Instituição</label>
          <input
            type="text"
            name="institution"
            required
            value={formData.institution}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: Cisco"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: Python Essentials I"
          />
        </div>
                <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <input
            type="text"
            name="kind"
            required
            value={formData.kind}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Ex: Certificação"
          />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data início</label>
          <input
            type="text"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            placeholder="Ex: Setembro/2026"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data de término</label>
          <input
            type="text"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            placeholder="Ex: Dezembro/2015"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"
          />
        </div>

      <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Finalizado?</label>
          <input
            type="checkbox"
            name="finished"
            checked={formData.finished}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none mb-2"
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
          Salvar Curso
        </button>
      </div>
    </form>
  );
};