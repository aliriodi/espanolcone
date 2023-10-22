import styles from '../../styles/footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';

export default function Footer() {
    const { t } = useTranslation(['navbar', 'aboutus', 'footer'])

    return (
        <>
            <Head>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" />
            </Head>
            <footer className={styles["footer"]}>

                <div className={styles["footer-welcome"]}>
                    <div className={styles["footer-welcome_item"]}>
                        <Image
                            className={styles["logo"]}
                            width={'100'}
                            height={'100'}
                            alt='Español con E'
                            src={t("logo")}
                        />
                        <p>
                            {t("footer:title")}
                        </p>
                        <Link className={styles['btn-signUp']} href={"/login"}>
                            {t("footer:button")}
                        </Link>
                    </div>
                </div>

                <div className={styles["footer-social"]}>

                    {/* Copyright */}
                    <div className={styles["copyright"]}>
                        <b>© 2022 </b>
                        <p>  Español con E</p>
                    </div>

                    {/* Social */}
                    <nav className={styles["social"]}>

                        {/* Instagram */}
                        <Link
                            href='https://www.instagram.com/espanolcone/'
                            alt="Instagram"
                            tilte="Instagram"
                            className={styles["icon"]}>
                            <i className="fab fa-instagram"></i>
                        </Link>

                        {/* Tiktok */}
                        <Link
                            href='https://vm.tiktok.com/ZMNx7dqn9/'
                            alt="Tiktok"
                            tilte="Tiktok"
                            className={styles["icon"]}>
                            <i className="fab fa-tiktok"></i>
                        </Link>

                        {/* Discord */}
                        <Link
                            href='https://discord.gg/QeC9mCShnm'
                            alt="Discord"
                            tilte="Discord"
                            className={styles["icon"]}>
                            <i className="fab fa-discord"></i>
                        </Link>

                        {/* Linkedin */}
                        <Link
                            href='https://www.linkedin.com/company/espanolcone/'
                            alt="Linkedin"
                            tilte="Linkedin"
                            className={styles["icon"]}>
                            <i className="fab fa-linkedin-in"></i>
                        </Link>

                    </nav>
                </div>
            </footer>
        </>
    )
}
