import "./styles.css"

export default function Test(){
    return(<>
    <div class="container">


        <header class="header">
        <div class="header-text">
            <h1>Seu Nome</h1>
            <p>Desenvolvedor • Cybersecurity • Tech</p>
        </div>

        <div class="profile-img">
            <img src="https://via.placeholder.com/120" alt="Foto de perfil"/>
        </div>
        </header>

        <main class="main">

        <section class="bio">
            <h2>Sobre mim</h2>
            <p>
            Aqui vai sua bio. Fale sobre você, suas habilidades,
            objetivos e o que você faz.
            </p>
        </section>

        <section class="links">
            <h2>Links</h2>
            <ul>
            <li><a href="#">GitHub</a></li>
            <li><a href="#">LinkedIn</a></li>
            <li><a href="#">Portfólio</a></li>
            </ul>
        </section>

        </main>
        <footer class="footer">
        <p>© 2026 - Seu Nome</p>
        </footer>

    </div>
    </>)
}