import { useState, useEffect } from 'react';
import { createCertificate, deleteCertificate, getCertificates, updateCertificate } from './../../services/api';
import type { Certificate } from './../../types';
import { Modal } from './../../components/ui/Modal';
import { CertificateForm } from './../../components/forms/CertificateForm';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);

  const loadCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
    } catch (error) {
      console.error("Erro ao buscar cursos", error);
    }
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  const handleSaveCertificate = async (formData: any) => {
    if (editingCertificate) {
      await updateCertificate(editingCertificate.id, formData);
    } else {
      await createCertificate(formData);
    }
    
    setIsModalOpen(false);
    setEditingCertificate(null);
    loadCertificates();
  };

  const handleOpenEdit = (certificate: Certificate) => {
    setEditingCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingCertificate(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteCertificate(id);
    loadCertificates();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Cursos</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Novo Curso
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {certificates.map((cert: Certificate) => (
            <div key={cert.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{cert.title} - {cert.institution}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium inline-block my-1">
                  {cert.end_date ? cert.end_date : 'Atual'}
                </span>
                <p className="text-gray-600 text-sm mt-1">Finalizado: {cert.finished ? 'Sim' : 'Não'}</p>
                <p className="text-gray-600 text-sm mt-1">Tipo: {cert.kind}</p>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(cert)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(cert.id)}
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
        onClose={() => { setIsModalOpen(false); setEditingCertificate(null); }} 
        title={editingCertificate ? "Editar Curso" : "Cadastrar Novo Curso"}
      >
        <CertificateForm
          initialData={editingCertificate} 
          onSubmit={handleSaveCertificate} 
          onCancel={() => { setIsModalOpen(false); setEditingCertificate(null); }} 
        />
      </Modal>
    </div>
  );
}