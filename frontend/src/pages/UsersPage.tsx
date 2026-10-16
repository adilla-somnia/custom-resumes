import { useState, useEffect } from 'react';
import { createUser, deleteUser, getUsers, updateUser } from './../../services/api';
import type { User } from './../../types';
import { Modal } from './../../components/ui/Modal';
import { UserForm } from './../../components/forms/UserForm';
import { Plus, Trash2, Edit2, GitBranch, Ghost } from 'lucide-react';

export default function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSaveUser = async (formData: any) => {
    if (editingUser) {
      await updateUser(editingUser.id, formData);
    } else {
      await createUser(formData);
    }
    
    setIsModalOpen(false);
    setEditingUser(null);
    loadUsers();
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleOpenCreate = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">Gerenciar Pessoas</h1>
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Plus size={18} /> Nova Pessoa
          </button>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-4">
          {users.map((user: User) => (
            <div key={user.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{user.full_name}</h3>
                <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md font-medium inline-block my-1">
                  {user.email} - {user.phone} - {user.city}
                </span>
                <div className='flex flex-col'>
                <p className="text-gray-600 text-sm mt-1 "><span className='font-bold'>Linkedin:</span> {user.linkedin}</p>
                {user.github ? <p className="text-gray-600 text-sm mt-1"><span className='font-bold'>Github:</span> {user.github}</p> : ''}
                {user.portfolio ? <p className="text-gray-600 text-sm mt-1"><span className='font-bold'>Portfólio:</span> {user.portfolio}</p> : ''}
                {user.kaggle ? <p className="text-gray-600 text-sm mt-1"><span className='font-bold'>Kaggle:</span> {user.kaggle}</p> : ''}
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Botão de Editar */}
                <button
                  onClick={() => handleOpenEdit(user)}
                  className="text-gray-400 hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                {/* Botão de Deletar */}
                <button
                  onClick={() => handleDelete(user.id)}
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
        onClose={() => { setIsModalOpen(false); setEditingUser(null); }} 
        title={editingUser ? "Editar Pessoa" : "Cadastrar Nova Pessoa"}
      >
        <UserForm
          initialData={editingUser} 
          onSubmit={handleSaveUser} 
          onCancel={() => { setIsModalOpen(false); setEditingUser(null); }} 
        />
      </Modal>
    </div>
  );
}