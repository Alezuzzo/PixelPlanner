import './styles/App.css'
import ContentProfile from './components/ContentProfile'
import ProgressBar from './components/ProgressBar'
import ContentInfo from './components/ContentInfo'

function App() {
  return (
    <>
      <div className='full-width-div'>
        <div className='column'>
        <ContentProfile />
        <ProgressBar/>
        </div>
        <div className='column'>
        <ContentInfo/>
        </div>
        
      </div>
    </>
  )
}

export default App
