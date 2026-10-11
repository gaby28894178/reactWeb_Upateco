
import { Link } from 'react-router-dom';

import  style from  './Navbar.module.css';


const Navbar = () => {
  return (
    <nav className={style.navbar}>
        <ol className={style.ol}>
            <li className={style.li}><Link to="/">Inicio</Link></li>
            <li className={style.li}><Link to="/about">Nosotros</Link></li>
            <li className={style.li}><Link to="/contact">Contactos</Link></li>

        </ol>
    </nav>
  
  )
}

export default Navbar