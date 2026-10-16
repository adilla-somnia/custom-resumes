import { useState } from 'react';
import PageButton from './../../components/ui/PageButton';
import ProjectsPage from './ProjectsPage';
import ExperiencesPage from './ExperiencesPage';
import UsersPage from './UsersPage';
import SummariesPage from './SummariesPage';
import LanguagesPage from './LanguagesPage';
import SkillsPage from './SkillsPage';
import EducationsPage from './EducationsPage';
import CertificatesPage from './CertificatesPage';

export default function Home() {
    const [active, setActive] = useState('');

    function switchPages() {
        switch (active) {
            case 'Projetos':
                return <ProjectsPage />
            case 'Experiências':
                return <ExperiencesPage />
            case 'Pessoas':
                return <UsersPage />
            case 'Resumos':
                return <SummariesPage />
            case 'Idiomas':
                return <LanguagesPage />
            case 'Skills':
                return <SkillsPage />
            case 'Formação':
                return <EducationsPage />
            case 'Cursos':
                return <CertificatesPage />
            default:
                return <div>nothing selected...</div>
        }
    }


    return (
        <>
        <div className='p-2 flex flex-row justify-start'>
            <PageButton title="Projetos" active={active == 'Projetos'} onPress={() => active == 'Projetos' ? setActive('') : setActive('Projetos')} />
            <PageButton title="Experiências" active={active == 'Experiências'} onPress={() => active == 'Experiências' ? setActive('') : setActive('Experiências')} />
            <PageButton title="Cursos" active={active == 'Cursos'} onPress={() => active == 'Cursos' ? setActive('') : setActive('Cursos')} />
            <PageButton title="Formação" active={active == 'Formação'} onPress={() => active == 'Formação' ? setActive('') : setActive('Formação')} />
            <PageButton title="Resumos" active={active == 'Resumos'} onPress={() => active == 'Resumos' ? setActive('') : setActive('Resumos')} />
            <PageButton title="Pessoas" active={active == 'Pessoas'} onPress={() => active == 'Pessoas' ? setActive('') : setActive('Pessoas')} />
            <PageButton title="Skills" active={active == 'Skills'} onPress={() => active == 'Skills' ? setActive('') : setActive('Skills')} />
            <PageButton title="Idiomas" active={active == 'Idiomas'} onPress={() => active == 'Idiomas' ? setActive('') : setActive('Idiomas')} />       
        </div>
        <section>
            {switchPages()}
        </section>
        </>
    )
}