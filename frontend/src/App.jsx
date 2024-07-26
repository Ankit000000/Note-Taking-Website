
import Homepage from "./pages/Homepage"
import Hyperlinks from "./pages/Hyperlinks"
import FavouriteHyperlinks from "./pages/FavouriteHyperlinks"
import Notes from "./pages/Notes"
import NoteDetail from "./pages/NoteDetail"
import HyperlinkDetails from "./pages/HyperlinkDetails"
import FavouriteNotes from "./pages/FavouriteNotes"
import Help from "./pages/Help"
import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { DarkModeProvider } from './contexts/DarkModeContext'


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <DarkModeProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/hyperlinks' element={<Hyperlinks />} />
            <Route path='/fav_hyperlinks' element={<FavouriteHyperlinks />} />
            <Route path='/notes' element={<Notes />} />
            <Route path='/notedetail/:id' element={<NoteDetail />} />
            <Route path='/hyperlinkdetail/:id' element={<HyperlinkDetails />} />
            <Route path='/favourite-notes' element={<FavouriteNotes />} />
            <Route path='/help' element={<Help />} />
          </Routes>
        </Router>
      </DarkModeProvider>
    </>
  )
}

export default App
