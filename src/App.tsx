import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {ForgotPassword, OtpEntry, ResetPassword } from "./Auth";
import { Login } from './Auth/Login';
import { Toaster } from 'react-hot-toast';
import { Try } from './Auth/Try';
import { Todo } from './Auth/Todo';
import { WeatherApp } from './Page/WeatherApp';
import { Stepper } from './Page/Stepper';
import  {ColorProvider} from './Context/ColorTypeContext';
import { ColorPage } from './Page/Color Page';
const App = () => {
  return (
<ColorProvider>

    <Router>
      <div className="min-h-screen bg-gray-50">

        <Toaster />
        <Routes>
      <Route path="/" element={<Login />} />
<Route path="/todo" element={<Todo/>}/>
<Route path="/wet" element={<WeatherApp/>}/>
<Route path="/step" element={<Stepper/>}/>
<Route path="/try" element={<Try />} />
<Route path="/color" element={<ColorPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
    </ColorProvider>
  );
};

export default App;
