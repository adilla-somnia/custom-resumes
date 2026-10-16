import { useEffect, useState } from "react";
import type { Experience, ItemAssociation, Language, Project, Resume, Skill, Summary, User } from "../../types"
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
import { GripVertical } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { createResume, getExperiences, getProjects, getSummaries, getUsers } from "../../services/api";

// Componente individual de item arrastável
interface SortableItemProps {
  item: Experience;
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
            {item.role}
          </span>
          <h4 className="font-semibold text-gray-800 text-base mt-0.5">{item.company}</h4>
          <p className="text-sm text-gray-500 line-clamp-1">{item.description_1}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 font-mono">ID: {item.id}</span>
    </div>
  );
}

// Componente individual de item arrastável
interface SortableProjectProps {
  item: Project;
}

function SortableProject({ item }: SortableProjectProps) {
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
            {item.tech_stack}
          </span>
          <h4 className="font-semibold text-gray-800 text-base mt-0.5">{item.title}</h4>
          <p className="text-sm text-gray-500 line-clamp-1">{item.description_1}</p>
        </div>
      </div>
      <span className="text-xs text-gray-400 font-mono">ID: {item.id}</span>
    </div>
  );
}

export default function BuildResumePage() {
    const [expData, setExpData] = useState<Experience[]>([]);
    const [projData, setProjData] = useState<Project[]>([]);
    const [userData, setUserData] = useState<User[]>([]);
    const [sumData, setSumData] = useState<Summary[]>([]);

    const [ chosenPerson, setChosenPerson] = useState<User | null>(null);
    const [ chosenExperiences, setChosenExperiences] = useState<Experience[]>([]);
    const [ chosenProjects, setChosenProjects] = useState<Project[]>([]);

    // const [ chosenCertificates, setChosenCertificates] = useState<User[]>([]);
    // const [ chosenSkills, setChosenSkills] = useState<Skill[]>([]);
    const [ chosenSummary, setChosenSummary] = useState<Summary | null>(null);
    const [ amiedPosition, setAimedPosition ] = useState('um teste');
    // const [ chosenLanguage, setChosenLanguage] = useState<Language[]>([]);

    function selectPerson({user}: {user: User}) {
        setChosenPerson(user);
    } 

    function removePerson() {
        setChosenPerson(null);
    }

    function selectSummary({summary}: {summary: Summary}) {
        setChosenSummary(summary);
    } 

    function removeSumary() {
        setChosenSummary(null);
    }

    function addExperienceToList({exp}: {exp: Experience}) {
        if (chosenExperiences.some((u) => u.id === exp.id)) return;

        setChosenExperiences([...chosenExperiences, exp])
    } 

    function removeExperience({exp}: {exp: Experience}) {
        setChosenExperiences(chosenExperiences.filter((u) => u.id !== exp.id))
    }

    function addProjectToList({proj}: {proj: Project}) {
        if (chosenProjects.some((u) => u.id === proj.id)) return;

        setChosenProjects([...chosenProjects, proj])
    } 

    function removeProject({proj}: {proj: Project}) {
        setChosenProjects(chosenProjects.filter((u) => u.id !== proj.id))
    }

    useEffect(() => {
        async function getExp() {
            const expp = await getExperiences();
            setExpData(expp);
        }
        async function getProj() {
            const projj = await getProjects();
            setProjData(projj);
        }
        async function getUsrs() {
            const usrs = await getUsers();
            setUserData(usrs);
        }
        async function getSum() {
            const summ = await getSummaries();
            setSumData(summ);
        }
        getExp();
        getProj();
        getUsrs();
        getSum();
    }, [])

    useEffect(() => {
    }, [chosenPerson])

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
          setChosenExperiences((chosenExperiences) => {
            const oldIndex = chosenExperiences.findIndex((item) => item.id === active.id);
            const newIndex = chosenExperiences.findIndex((item) => item.id === over.id);
            return arrayMove(chosenExperiences, oldIndex, newIndex);
          });
        }
      };

            // Função disparada quando o usuário solta o item arrastado
      const handleDragEndProj = (event: DragEndEvent) => {
        const { active, over } = event;
    
        if (over && active.id !== over.id) {
          setChosenProjects((chosenProjects) => {
            const oldIndex = chosenProjects.findIndex((item) => item.id === active.id);
            const newIndex = chosenProjects.findIndex((item) => item.id === over.id);
            return arrayMove(chosenProjects, oldIndex, newIndex);
          });
        }
      };
    
      const handleSaveOrder = () => {
        // Aqui você faria a chamada para a API salvando a nova ordem (`resume_projects` / junções)
        alert('Ordem dos blocos salva com sucesso!');
        if (!chosenPerson || !chosenSummary || !amiedPosition) return;

        const preData: Resume = {
            user_id: chosenPerson?.id,
            aimed_position: amiedPosition,
            title: "teste 1",
            summary_id: chosenSummary?.id,
            experiences: chosenExperiences.map((e, index) => ({
              item_id: e.id,
              order: index + 1,
            })),
            projects: chosenProjects.map((e, index) => ({
              item_id: e.id,
              order: index + 1,
            }))
        };
             async function saveResume() {
            try {
                const res = await createResume(preData);
                alert(`Currículo "${res.title}" salvo com sucesso!`);
            } catch (error) {
                console.error("Erro ao salvar currículo:", error);
                alert("Erro ao salvar o currículo. Verifique o console.");
            }
            }

            saveResume();
        };


    return (
        <div className="p-1 rounded gap-2 flex flex-col">
            <button onClick={handleSaveOrder} className="p-1 bg-white rounded">
                Salvar
            </button>
            <div className="flex flex-row gap-2 h-300 justify-between">
                <div className="flex-1 flex flex-col gap-5 p-2 bg-blue-900">
                    <ChooseSection onRemove={removePerson} onChoose={selectPerson} users={userData} title="Escolher Pessoa" />
                    <ChooseSectionSummary onRemove={removeSumary} onChoose={selectSummary} summaries={sumData} title="Escolher Resumo" />
                    <ChooseSectionExperiences onRemove={removeExperience} onChoose={addExperienceToList} experiences={expData} title="Escolher Experiências" />
                    <ChooseSectionProjects onRemove={removeProject} onChoose={addProjectToList} projects={projData} title="Escolher Projetos" />
                </div>
                <div className="flex-2 p-2 bg-green-100 flex flex-col gap-3">
                                      {/* Contexto do Dnd Kit */}
                    <div className="min-h-30 bg-white p-1 rounded">
                        {chosenPerson ? 
                            <>
                                <p className="text-2xl font-semibold text-black">{chosenPerson?.full_name}</p>
                                <p>{chosenPerson?.email} | {chosenPerson?.phone} | {chosenPerson?.city}</p>
                            </>
                        :
                            <p>Nenhuma pessoa selecionada</p>}
                    </div>

                    <div className="min-h-30 bg-white p-1 rounded">
                        <p className="text-black font-semibold">Resumo</p>
                        {chosenSummary ? 
                            <>
                                <p>{chosenSummary?.summary}</p>
                            </>
                        :
                            <p>Nenhum resumo selecionado</p>}
                    </div>

                    <div className="min-h-30 bg-white rounded p-1">
                        <p className="text-black font-semibold">Experiência Profissional</p>


                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                  >
                    <SortableContext items={chosenExperiences} strategy={verticalListSortingStrategy}>
                      <div className="space-y-3">
                        {chosenExperiences.map((item) => (
                          <SortableItem key={item.id} item={item} />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>


                    </div>

                    <div className="min-h-30 bg-white rounded p-1">
                        <p className="text-black font-semibold">Projetos</p>
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEndProj}
                            >
                                <SortableContext items={chosenProjects} strategy={verticalListSortingStrategy}>
                                <div className="space-y-3">
                                    {chosenProjects.map((item) => (
                                    <SortableProject key={item.id} item={item} />
                                    ))}
                                </div>
                                </SortableContext>
                            </DndContext>

                  </div>
                </div>
            </div>

        </div>
    )
}

function ChooseSection(
    {title, users, onChoose, onRemove}:
     {title: string,
        users: User[],
        onChoose: ({user}: {user: User}) => void,
        onRemove: ({user}: {user: User}) => void
    }) {
    const [chosen, setChosen] = useState<User | null>(null);

    return (
        <div className="bg-white p-2 rounded">
            <p className="text-black font-semibold">{title}</p>
            <div className="bg-gray-200 p-1 h-30 overflow-y-scroll flex flex-col gap-1">
                {users.map((u: User) => {
                    return <button onClick={() => setChosen(u)} className="text-left pl-1 cursor-pointer" key={u.id}>
                        {u.full_name}
                        </button>
                })}
            </div>
            <div className="flex flex-row justify-around py-2">
                <button onClick={() => {
                    if (chosen) {
                        onRemove({user: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Limpar</button>
                <button disabled={!chosen} onClick={() => {
                    if (chosen) {
                      onChoose({user: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Escolher</button>
            </div>
            <p>Chosen: {chosen?.full_name}</p>
            
        </div>
    )
}


function ChooseSectionSummary(
    {title, summaries, onChoose, onRemove}:
     {title: string,
        summaries: Summary[],
        onChoose: ({summary}: {summary: Summary}) => void,
        onRemove: ({summary}: {summary: Summary}) => void
    }) {
    const [chosen, setChosen] = useState<Summary>(null);

    return (
        <div className="bg-white p-2 rounded">
            <p className="text-black font-semibold">{title}</p>
            <div className="bg-gray-200 p-1 h-30 overflow-y-scroll flex flex-col gap-1">
                {summaries.map((u: Summary) => {
                    return <button onClick={() => setChosen(u)} className="text-left pl-1 cursor-pointer" key={u.id}>
                        {u.title}
                        </button>
                })}
            </div>
            <div className="flex flex-row justify-around py-2">
                <button onClick={() => {
                    if (chosen) {
                        onRemove({summary: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Limpar</button>
                <button disabled={!chosen} onClick={() => {
                    if (chosen) {
                      onChoose({summary: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Escolher</button>
            </div>
            <p>Chosen: {chosen?.title}</p>
            
        </div>
    )
}


function ChooseSectionExperiences(
    {title, experiences, onChoose, onRemove}:
     {title: string,
        experiences: Experience[],
        onChoose: ({exp}: {exp: Experience}) => void,
        onRemove: ({exp}: {exp: Experience}) => void
    }) {
    const [chosen, setChosen] = useState<Experience | null>(null);

    return (
        <div className="bg-white p-2 rounded">
            <p className="text-black font-semibold">{title}</p>
            <div className="bg-gray-200 p-1 h-30 overflow-y-scroll flex flex-col gap-1">
                {experiences.map((u: Experience) => {
                    return <button onClick={() => setChosen(u)} className="text-left pl-1 cursor-pointer" key={u.id}>
                        {u.role} - {u.company}
                        </button>
                })}
            </div>
            <div className="flex flex-row justify-around py-2">
                <button onClick={() => {
                    if (chosen) {
                        onRemove({exp: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Retirar</button>
                <button disabled={!chosen} onClick={() => {
                    if (chosen) {
                        onChoose({exp: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Adicionar</button>
            </div>
            <p>Chosen: {chosen?.id}</p>
            
        </div>
    )
}


function ChooseSectionProjects(
    {title, projects, onChoose, onRemove}:
     {title: string,
        projects: Project[],
        onChoose: ({proj}: {proj: Project}) => void,
        onRemove: ({proj}: {proj: Project}) => void
    }) {
    const [chosen, setChosen] = useState<Project | null>(null);

    return (
        <div className="bg-white p-2 rounded">
            <p className="text-black font-semibold">{title}</p>
            <div className="bg-gray-200 p-1 h-30 overflow-y-scroll flex flex-col gap-1">
                {projects.map((u: Project) => {
                    return <button onClick={() => setChosen(u)} className="text-left pl-1 cursor-pointer" key={u.id}>
                        {u.title} - {u.tech_stack}
                        </button>
                })}
            </div>
            <div className="flex flex-row justify-around py-2">
                <button onClick={() => {
                    if (chosen) {
                        onRemove({proj: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Retirar</button>
                <button disabled={!chosen} onClick={() => {
                    if (chosen) {
                        onChoose({proj: chosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Adicionar</button>
            </div>
            <p>Chosen: {chosen?.id}</p>
            
        </div>
    )
}