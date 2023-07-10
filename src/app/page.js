import styles from './styles/page.module.css';
import Image from 'next/image'
import checkImg from './../../public/ui/check.png'
import ghImg from './../../public/ui/github-mark.png'
import TodoList from './components/TodoList';
import Link from 'next/link'

export default function Home() {
    return (
        <main className={styles.main}>
            <div id='app-title-container'>
                <h1 id='app-title'>Next Todo v.1</h1>
                <Image id='app-title-img' 
                    src={checkImg} 
                    alt='move down' 
                    width={20} 
                    height={20} 
                    loading='lazy' 
                    layout='reponsive'
                />
                <Link id='gh-link' href='https://www.github.com/happycod3r/Next-Todo'>
                    <Image id='gh-link-img' 
                        src={ghImg} 
                        alt='move down' 
                        width={30} 
                        height={30} 
                        loading='lazy' 
                        layout='reponsive'
                    />
                </Link>
            </div>    
            <TodoList />
        </main>
    )
}
