import { Route, Routes } from 'react-router-dom';

// Pages
import Login from '../pages/Login';
import Home from '../pages/Home';
import Users from '../pages/Users'
import Projects from '../pages/Projects';
import Catalog from '../pages/Catalog';
import Project from '../pages/Project';
import NewProject from '../pages/NewProyect';
import Glosary from '../pages/Glosary';
import Requeriment from '../pages/Requirement';
import Notifications from '../pages/Notifications';
import ProjectPath from '../pages/ProjectPath';
import ApproveProject from '../pages/ApproveProject';
import ApproveGlosary from '../pages/ApproveGlosary';

const Router = () => {
    return (
      
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home/> } />
          <Route path='/usuarios' element={<Users/> } /> 
          <Route path='/proyectos' element={<Projects/> } /> 
          <Route path='/catalogo' element={<Catalog/> } /> 
          <Route path='/glosario' element={<Glosary/> } /> 
          <Route path='/proyecto/:id' element={<Project/> } />
          <Route path='/proyecto'  element={<NewProject/> } />
          <Route path='/requerimiento' element={<Requeriment/> } /> 
          <Route path='/notificaciones' element={<Notifications/> } />
          <Route path='/ruta-proyecto/:id' element={<ProjectPath/> } />
          <Route path='/aprobar-proyecto/:id' element={<ApproveProject/> } />  
          <Route path='/aprobar-glosario/:id' element={<ApproveGlosary/> } />  


          
       </Routes>
        
      
      
    );
  }
  
export default Router;