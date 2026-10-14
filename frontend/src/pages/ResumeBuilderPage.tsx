import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, FileText, CheckCircle2 } from 'lucide-react';

// Interface temporária para os blocos do currículo
interface ResumeItem {
  id: string;
  title: string;
  category: string;
  description: string;
}

// Componente individual de item arrastável
interface SortableItemProps {
  item: ResumeItem;
}

function SortableItem({ item }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white p-4 rounded-xl border ${
        isDragging ? 'border-indigo-500 shadow-lg' : 'border-gray-200 shadow-sm'
      } flex items-center justify-between gap-4 transition-colors`}
    >
      <div className="flex items-center gap-3">
        {/* Alça de arrastar (handle) */}
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing p-1 rounded-lg hover:bg-gray-100 transition-colors"
          title="Arraste para reordenar"
        >
          <GripVertical size={20} />
        </button>
        <div>
          <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md font-medium">
            {item.category}
          </span>
          <h4 className="font-semibold text-gray-800 text-base mt-0.5">{item.title}</h4>
          <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 font-mono">ID: {item.id}</span>
    </div>
  );
}

export default function ResumeBuilderPage() {
  // Lista simulada de itens selecionados para o currículo
  const [items, setItems] = useState<ResumeItem[]>([
    { id: '1', title: 'Plataforma de Analytics & Gestão', category: 'Projeto', description: 'Sistema full-stack com NestJS e React para controle acadêmico.' },
    { id: '2', title: 'Assistente Administrativo de Dados', category: 'Experiência', description: 'Automação de processos e relatórios usando Python e Power Apps.' },
    { id: '3', title: 'Análise de Churn de Clientes', category: 'Projeto', description: 'Dashboard interativo construído em Power BI e SQL.' },
    { id: '4', title: 'Análise e Desenvolvimento de Sistemas', category: 'Educação', description: 'Graduação tecnológica em andamento pelo IFPE.' },
  ]);

  // Sensores necessários para detectar cliques e o arraste corretamente (inclusive por teclado)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Função disparada quando o usuário solta o item arrastado
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleSaveOrder = () => {
    // Aqui você faria a chamada para a API salvando a nova ordem (`resume_projects` / junções)
    alert('Ordem dos blocos salva com sucesso!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Montagem do Currículo</h2>
          <p className="text-sm text-gray-500">Arraste os blocos abaixo para definir a ordem em que eles aparecerão no seu currículo.</p>
        </div>
        <button
          onClick={handleSaveOrder}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium text-sm"
        >
          <CheckCircle2 size={18} /> Salvar Ordem
        </button>
      </div>

      {/* Contexto do Dnd Kit */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {items.map((item) => (
              <SortableItem key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}