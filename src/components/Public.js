import { Link } from "react-router-dom";

import React from 'react'

const Public = () => {
  
    const content = (
        <section>
        <header>
            <h1>Welcome to <span className="nowrap"> repair shop</span></h1>
        </header>

        <main className="public__main">
            <p>Located in Milan , our repair shop provide a  trained staff
                ready to meet your tech repair needs.
            </p>
            <address className="public__addr">
                The Rapair Shop <br />
                39 , F. Turati <br />
                Milan , Italy <br />
                <a href="tel:+390255336677">(02) 553-366-77</a>
            </address>
            <br />
            <p>Owner : Paolo Giovannelli</p>
        </main>

        <footer>
            <Link to="/login">Employee Login</Link>
        </footer>

        </section>
    )

    return content
}

export default Public