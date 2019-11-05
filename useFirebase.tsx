export function useFirebase() {
    const [messages, setValue]: any = useState([])
    const [loading, setLoading] = useState(true)

    const firebaseConfig = {
        apiKey: "xxx",
        authDomain: "xxx.firebaseapp.com",
        databaseURL: "https://xxx.firebaseio.com",
        projectId: "xxx",
        storageBucket: "xxx.appspot.com",
        messagingSenderId: "xxx",
        appId: "xxx",
        measurementId: "xxx",
    }

    let firebaseDatabase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
    }

    firebaseDatabase = firebase.database().ref("messages/")

    useEffect(() => {
        // Load messages
        firebaseDatabase.on("value", snapshot => {
            let initialData = []
            snapshot.forEach(child => {
                initialData.push({
                    key: child.key,
                    name: child.val().name,
                    text: child.val().text,
                    reactions: child.val().reactions,
                })
            })
            setValue(initialData)
            setLoading(false)
        })
        return () => {
            firebaseDatabase.off("value")
        }
    }, [])

    const addMessage = (name, text) => {
        firebaseDatabase.push({
            name: name,
            text: text,
            timestamp: firebase.database.ServerValue.TIMESTAMP,
        })
    }

    return { messages, addMessage, loading }
}



🍉 Example...

const ChatView = () => {
  const { messages, addMessage, loading } = useFirebase()
  const [inputValue, setInputValue] = useState("")
  
  return (
    <div>
      <h1>Messages</h1>
      {message.map((item, i) => {
        return <Message
          key={item.key}
          name={item.name}
          text={item.text}
        />
      }}
      <input
        value={inputValue}
        onChange={event => setInputValue(event.target.value)}
      />
      <button
        onClick={() => addMessage("Max", inputValue)
      >Send to Firebase</button>
    </div>
  )
}

