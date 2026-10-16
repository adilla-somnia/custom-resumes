interface Props {
    active?: boolean,
    title: string,
    onPress: () => void
}

export default function PageButton({active, title, onPress}: Props) {
    return (
        <button
            onClick={onPress}
            className={`${active ? 'bg-gray-300 shadow-2xl shadow-black' : 'bg-white'} text-blue-950 p-2 border-gray-500 border font-semibold hover:bg-blue-200 cursor-pointer transform duration-100`}>
                {title}
        </button>
    )
}