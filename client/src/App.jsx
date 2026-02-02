import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';
import { AuthModal, DesignsGallery } from './components';

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customizer />
      <AuthModal />
      <DesignsGallery />
    </main>
  )
}

export default App
