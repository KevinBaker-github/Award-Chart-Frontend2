import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes"

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </main>
  )
}

export default App
