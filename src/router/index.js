import { createBrowserRouter } from 'react-router-dom'
import Layout from '@/pages/Layout'
import Login from '@/pages/Login'
import { AuthRoute } from '@/components/AuthRoute'
// import Home from '@/pages/Home'
// import Article from '@/pages/Article'
// import Publish from '@/pages/Publish'
import { Suspense, lazy } from 'react'

const Home = lazy(() => import('@/pages/Home'))
const Article = lazy(() => import('@/pages/Article'))  
const Publish = lazy(() => import('@/pages/Publish'))

const router = createBrowserRouter([
    {
        path: '/',
        element: <AuthRoute> <Layout /> </AuthRoute>,
        children: [
            {
                index: true,
                element: <Suspense fallback={<div>loading...</div>}> <Home /> </Suspense>
            },
            {
                path: 'article',
                element: <Suspense fallback={<div>loading...</div>}> <Article /> </Suspense>
            },
            {
                path: 'publish',
                element: <Suspense fallback={<div>loading...</div>}> <Publish /> </Suspense>
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    }
])

export default router