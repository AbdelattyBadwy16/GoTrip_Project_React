import Logo from './Logo'
import styles from './Sidebar.module.css'
import AppNav from './AppNav'
import { Outlet } from 'react-router-dom'
export default function SideBar()
{
    return(<div className={styles.sidebar}>
        <Logo></Logo>
        <AppNav></AppNav>
        <Outlet/>
        <footer className={styles.footer}>
          <p className={styles.copyright}>
            &copy: Copyright {new Date().getFullYear()} by Abdelatty Badwy .
          </p>
        </footer>
    </div>
    )
}