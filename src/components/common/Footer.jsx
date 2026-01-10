const Footer =()=>{

    return(
        <footer className="footer">
            <div className="footer-content">
                <p>@Copyright; {new Date().getFullYear()} Food App. All rights reserved</p>
                <div className="footer-links">
                    <a href="#" className="footer-link">Terms of service</a>
                    <a href="#" className="footer-link">Privacy policy</a>
                    <a href="https://www.linkedin.com/in/imesha-dewmin-519285222/" className="footer-link">Linkedin</a>
                    <a href="https://www.instagram.com/imesha.dewmin/" className="footer-link">Instagram</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;