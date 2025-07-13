import { LinearProgress } from '@mui/material'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

const Auth = lazy(() => import('@/features/Auth/Auth'))
const Welcome = lazy(() => import('@/features/Welcome/Welcome'))
const Profile = lazy(() => import('@/features/Profile/page/Profile'))
const Main = lazy(() => import('@/features/Main/Main'))

function App() {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Routes>
        <Route path="/" element={<Navigate to="welcome" />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="auth/*" element={<Auth />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard/*" element={<Main />} />
      </Routes>
    </Suspense>
  )
}

export default App
