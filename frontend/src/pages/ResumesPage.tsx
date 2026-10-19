import { useEffect, useState } from "react";
import type { Experience, FullResume, Project, SmallResume } from '../../types/index';
import { getResume, getResumes } from "../../services/api";

export function BulletPoint() {
    return (
     <div className="h-2 w-2 bg-black rounded-full" />
    )
}

export default function ResumesPage() {
    const [resumes, setResumes] = useState<SmallResume[]>();
    const [viewOne, setViewOne] = useState(false);
    const [fullResume, setFullResume] = useState<FullResume | null>(null);

    useEffect(() => {
        async function getData() {
            const res = await getResumes();

            setResumes(res);
        }
        getData();
    })

    async function chooseResume({chosen}: {chosen: SmallResume}) {
        if (chosen.id === undefined) return;

        setViewOne(true);
        const res = await getResume({id: chosen.id});

        setFullResume(res);
        console.log(res)
    }

    function handleClose() {
        setViewOne(false);
        setFullResume(null);
    }

    return (
        <section>
            <div className="flex flex-col gap-2">
                <p className="text-3xl font-semibold text-white">Currículos</p>
                <div className={`${viewOne ? 'hidden' : 'flex'} flex-col gap-2`}>
                {resumes?.map((r: SmallResume) => (
                    <div key={r.id}
                    onClick={() => chooseResume({chosen: r})}
                    className="bg-white p-4 text-black rounded-xl border border-gray-200 shadow-sm hover:border-indigo-500 active:bg-indigo-200 cursor-pointer flex flex-col items-left justify-between gap-4 transition-colors"
                    >
                        <h4 className="font-semibold text-gray-800 text-base mt-0.5">{r.title}</h4>
                        <p>Aimed position: {r.aimed_position}</p>
                        <p>Criado: {new Date(r.created_at).toLocaleDateString('pt-br')}</p>
                    </div>
                ))}

                </div>


                <div className={`${viewOne ? 'flex' : 'hidden'} flex-col gap-3`}>
                    <button className={`self-end cursor-pointer hover:bg-gray-300 bg-white p-2 rounded-xl shadow-2xs text-black font-semibold`} title="Fechar currículo" onClick={handleClose}>Fechar</button>
                    <div className="bg-white p-2 pr-5 rounded-xl text-gray-700 font-semibold self-baseline">
                        <p className="text-xl text-black">Visualizando um currículo</p>
                        <p>Título: {fullResume?.title}</p>
                        <p>Criado: {fullResume?.created_at ? new Date(fullResume.created_at).toLocaleDateString('pt-br') : ''}</p>
                    </div>

                    <div className="bg-white p-4 rounded-xs text-black flex flex-col gap-2">
                        <div>
                            <p><span className="text-2xl font-semibold">{fullResume?.user?.full_name}</span> | {fullResume?.user?.email} | {fullResume?.user?.phone}</p>
                            <p>{fullResume?.aimed_position} | {fullResume?.user?.city} | <a href={fullResume?.user?.linkedin}>Linkedin</a> | <a href={fullResume?.user?.github}>GitHub</a> | <a href={fullResume?.user?.portfolio}>Portfolio</a> | <a href={fullResume?.user?.kaggle}>Kaggle</a> 
                            </p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">Resumo</h3>
                            <p>
                                {fullResume?.summary?.summary}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">Projetos</h3>
                            {fullResume?.projects?.map((p: Project) => (
                                <div key={p.id}>
                                    <p><span className="font-semibold">{p.title}</span> ({p.tech_stack}) | <a href={p.link_1}>{p.link_1_title}</a> 
                                        {p.link_2 ? ' | ' : ''}
                                        {p.link_2 ? <a href={p.link_2}>{p.link_2_title}</a> : ''}
                                            {p.link_3 ? ' | ' : ''}
                                            {p.link_3 ? <a href={p.link_3}>{p.link_3_title}</a> : ''}
                                        </p>
                                    <p> • {p.description_1}</p>
                                    {p.description_2 ? <p>• {p.description_2}</p> : ''}
                                    {p.description_3 ? <p>• {p.description_3}</p> : ''}
                                    </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-xl font-semibold">Experiência Profissional</h3>
                            {fullResume?.experiences?.map((e: Experience) => (
                                <div key={e.id}>
                                    <p>{e.company} - <span className="font-semibold">{e.role}</span> | {e.start_date} - {e.end_date ? e.end_date : 'Atual'}</p>
                                    <p> • {e.description_1}</p>
                                    {e.description_2 ? <p>• {e.description_2}</p> : ''}
                                    {e.description_3 ? <p>• {e.description_3}</p> : ''}
                                    </div>
                            ))}
                        </div>
                    </div>

                </div>

            </div>
        </section>
    )
}


// className={`bg-white p-4 rounded-xl border ${
//         isDragging ? 'border-indigo-500 shadow-lg' : 'border-gray-200 shadow-sm'
//       } flex items-center justify-between gap-4 transition-colors`}