import styles from "./style.module.css"

export default function Home(){

    return (
        <>
        <div className={styles.container}>
            <img src="src\assets\space.jpg"/>
            <form>
                    <h1>Criar usuário</h1>
                    <div className={styles["form-input"]}>
                        <input id='user' type='text' placeholder='User'/>
                    </div>

                    <div className={styles["form-input"]}>
                        <input id='email' type='email' placeholder='Email'/>
                    </div>
                    <div className={styles["form-input"]}>
                        <button>Criar</button>
                    </div>
                    <a href='#'>Esqueceu a sua senha?</a>
            </form>
        </div>
        </>
    )
}