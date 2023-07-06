import Image from 'next/image'
import styles from './page.module.css'
import TodoList from './components/TodoList';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
            <TodoList />
        </div>
      </div>
    </main>
  )
}
