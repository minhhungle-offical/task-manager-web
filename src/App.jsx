import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Auth = lazy(() => import('@/features/Auth/Auth'))
const Welcome = lazy(() => import('@/features/Welcome/Welcome'))
const Profile = lazy(() => import('@/features/Profile/page/Profile'))
const Main = lazy(() => import('@/features/Main/Main'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="welcome" />} />
      <Route path="welcome" element={<Welcome />} />
      <Route path="auth/*" element={<Auth />} />
      <Route path="profile" element={<Profile />} />
      <Route path="dashboard/*" element={<Main />} />
    </Routes>
  )
}

export default App
