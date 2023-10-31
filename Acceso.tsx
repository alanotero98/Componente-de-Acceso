import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import './Acceso.css'
import { useNavigate } from 'react-router-dom';
import { validateUsername, validatePassword } from './Validation';

const Acceso: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [modoOscuro, setModoOscuro] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'username') {
      const usernameValidation = validateUsername(value);
      setUsernameError(usernameValidation.message);
    } else if (name === 'password') {
      const passwordValidation = validatePassword(value);
      setPasswordError(passwordValidation.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
  
    const { username, password } = formData;
  
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);
  
    if (!usernameValidation.isValid) {
      setUsernameError(usernameValidation.message);
      return;
    } else {
      setUsernameError('');
    }
  
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.message);
      return;
    } else {
      setPasswordError('');
    }
  
    try {
      // Verificar si el usuario ya está registrado y si la contraseña coincide
      const response = await axios.get(`/api/usuarios/verificar?username=${username}&password=${password}`);
  
      if (response.data.existe) {
        // El usuario existe en la base de datos, mostrar mensaje de error
        setUsernameError('Este usuario ya está registrado.');
        navigate('/');
      } else {
        // El usuario no existe, mostrar mensaje indicando que el usuario no está registrado
        setUsernameError('Este usuario no está registrado.');
      }
    } catch (error) {
      setUsernameError('Error al verificar el usuario. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  

  //logia para cambiar a modo oscuro
  const toggleModoOscuro = (): void => {
    setModoOscuro(!modoOscuro);
  };

  return (
    <div className={`formAcceso ${modoOscuro ? 'modoOscuro' : ''}`}>
      <button onClick={toggleModoOscuro} className='botonDeModos'>
      {modoOscuro ? <i className="material-icons">brightness_5</i> : <i className="material-icons">brightness_2</i>}
      </button>
    <form onSubmit={handleSubmit} className='formAcceso'>
      <h2>Acceso</h2>
      <div>
        <label>Nombre de Usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          />
        {usernameError && <p>{usernameError}</p>}
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          />
        {passwordError && <p>{passwordError}</p>}
      </div>
      <button type="submit">Acceder</button>
    </form>
    </div>
  );
};

export default Acceso;
