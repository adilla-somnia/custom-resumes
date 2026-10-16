import { useEffect, useState } from "react";
import type { User } from "../../types"

export default function BuildResumePage() {

    const users = [
  {
    "full_name": "Fulne 1",
    "email": "saildjaslkdj@gmail.com",
    "phone": "92398239123",
    "city": "Reiuajsdasd",
    "linkedin": "https://google.com",
    "github": "https://google.com",
    "portfolio": "https://google.com",
    "kaggle": "https://google.com",
    "id": 1
  },
  {
    "full_name": "fulne3",
    "email": "fuelkn3@gmail.com",
    "phone": "8912372398",
    "city": "reicifei",
    "linkedin": "https://google.com",
    "github": "https://google.com",
    "portfolio": "https://google.com",
    "kaggle": "https://google.com",
    "id": 2
  }
]

    const [chosen, setChosen] = useState<User[]>([]);

    function addToList({user}: {user: User}) {
        if (chosen.some((u) => u.id === user.id)) return;

        setChosen([...chosen, user])
    } 

    function remove({user}: {user: User}) {
        setChosen(chosen.filter((u) => u.id !== user.id))
    }

    useEffect(() => {
    }, [chosen])

    return (
        <div className="p-1 rounded">
            <div className="flex flex-row gap-2 h-300 justify-between">
                <div className="flex-1 p-2 bg-blue-900">
                    <ChooseSection onRemove={remove} onChoose={addToList} users={users} title="Escolher Pessoa" />
                </div>
                <div className="flex-2 p-2 bg-green-600">
                    <p>Lado de arrastar</p>
                    {chosen?.map((u) => {
                        return <div key={u.id}>
                            <p>{u.full_name}</p>
                        </div>
                    })}
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
    const [choosen, setChoosen] = useState<User | null>(null);

    return (
        <div className="bg-white p-2 rounded">
            <p className="text-black font-semibold">{title}</p>
            <div className="bg-gray-200 p-1 h-30 overflow-y-scroll flex flex-col gap-1">
                {users.map((u: User) => {
                    return <button onClick={() => setChoosen(u)} className="text-left pl-1 cursor-pointer" key={u.id}>
                        {u.full_name}
                        </button>
                })}
            </div>
            <div className="flex flex-row justify-around py-2">
                <button onClick={() => {
                    if (choosen) {
                        onRemove({user: choosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Retirar</button>
                <button disabled={!choosen} onClick={() => {
                    if (choosen) {
                        onChoose({user: choosen})
                    }
                }} className="bg-gray-500 p-2 rounded-xl text-white cursor-pointer hover:bg-gray-400 transition duration-200">Adicionar</button>
            </div>
            <p>Chosen: {choosen?.full_name}</p>
        </div>
    )
}