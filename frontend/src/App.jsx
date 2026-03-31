import AppRoutes from './routes/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <AppRoutes />
      <ToastContainer autoClose={3000} position="bottom-right" pauseOnHover={true} dragable={true} />
    </>
  )
}

export default App;
