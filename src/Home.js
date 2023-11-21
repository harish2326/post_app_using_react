import { useContext } from 'react'
import Feed from './Feed'
import DataContext from './context/DataContext'

const Home = () => {
  const {searchresult,fetchError,isLoading} = useContext(DataContext)
  return (
    <main className='Home'>
        {isLoading && <p className='statusMsg'>Loding posts...</p>}
        {!isLoading && fetchError && <p className='statusMsg' style={{color:'red'}}>{fetchError}</p>}
        {!isLoading && !fetchError && (searchresult.length ? <Feed posts={searchresult}/> : <p className='statusMsg'>No Posts To Display..</p>)}
    </main>
  )
}

export default Home