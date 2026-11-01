import { NavLink } from 'react-router-dom';
import style from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={style.navbar}>
      <ol className={style.ol}>
        <li className={style.li}>
          <NavLink to="/" end className={({ isActive }) => isActive ? style.active : undefined}>Inicio</NavLink>
        </li>
        <li className={style.li}>
          <NavLink to="/about" className={({ isActive }) => isActive ? style.active : undefined}>Nosotros</NavLink>
        </li>
        <li className={style.li}>
          <NavLink to="/contact" className={({ isActive }) => isActive ? style.active : undefined}>Contactos</NavLink>
        </li>
      </ol>
    </nav>
  );
};

export default Navbar;
