import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login'
import Comanda from './Comanda'
import Cozinha from './Cozinha'
import Dashboard from './Admin/Dashboard'
import Layout from '../Layout'

export default function Navigation() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={
                    <Login />
                } />
                <Route path='/comanda' element={
                    <Layout>
                        <Comanda />
                    </Layout>
                } />
                <Route path='/cozinha' element={
                    <Layout>
                        <Cozinha />
                    </Layout>
                } />
                <Route path='/admin/dashboard' element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    )
}