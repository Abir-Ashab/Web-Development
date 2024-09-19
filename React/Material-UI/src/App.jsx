import { useState } from 'react'
import './App.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function App() {
  const [color, setcolor] = useState('')

  return (
    <>
        <ThumbUpIcon onClick={() => setcolor(color ? '' : 'primary')} color = {color}></ThumbUpIcon>
    </>
  )
}

export default App
