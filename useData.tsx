export function useData(
    source:
        | "chat-thread"
        | "people"
        | "cities"
        | "folders"
        | "products"
        | "top-10-albums"
        | "taylor-swift-discography"
) {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://api.realdata.dev/v1/${source}`)
            .then(resp => resp.json())
            .then(json => setData(json))
    }, [source])

    return { data }
}




🧁 Example...

const Example = () => {
    const { albumData } = useData("top-10-albums")

    return (
        <div>
            {albumData.map(item => {
                return <div>{item.name}</div>
            })}
        </div>
    )
}