import Link from "next/link";

export const metadata = {
    title: "Datenschutz - Tabea Prante",
};

export default function DatenschutzPage() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-24 text-zinc-800">
            <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-700 transition-colors">
                &larr; Back
            </Link>

            <h1 className="mt-10 text-3xl font-light">Datenschutzerkl&auml;rung</h1>

            <div className="mt-10 space-y-6 text-sm leading-relaxed text-zinc-600">
                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">1. Datenschutz auf einen Blick</h2>
                    <p>
                        Die folgenden Hinweise geben einen einfachen &Uuml;berblick dar&uuml;ber,
                        was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website
                        besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                        pers&ouml;nlich identifiziert werden k&ouml;nnen.
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">2. Verantwortliche Stelle</h2>
                    <p>
                        Tabea Prante<br />
                        [Adresse auf Anfrage]<br />
                        Berlin, Deutschland<br />
                        E-Mail: <a href="mailto:tabea.prante@gmail.com" className="underline">tabea.prante@gmail.com</a>
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">3. Datenerfassung auf dieser Website</h2>
                    <p>
                        Diese Website verwendet keine Cookies, kein Tracking und keine
                        Analysetools. Es werden keine personenbezogenen Daten erhoben,
                        gespeichert oder an Dritte weitergegeben.
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">4. Hosting</h2>
                    <p>
                        Diese Website wird bei einem externen Dienstleister gehostet (Hoster).
                        Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                        werden auf den Servern des Hosters gespeichert. Hierbei kann es sich
                        v.a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten,
                        Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten,
                        die &uuml;ber eine Website generiert werden, handeln.
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">5. Ihre Rechte</h2>
                    <p>
                        Sie haben jederzeit das Recht, unentgeltlich Auskunft &uuml;ber Herkunft,
                        Empf&auml;nger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
                        erhalten. Sie haben au&szlig;erdem ein Recht, die Berichtigung oder
                        L&ouml;schung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur
                        Datenverarbeitung erteilt haben, k&ouml;nnen Sie diese Einwilligung
                        jederzeit f&uuml;r die Zukunft widerrufen. Hierzu sowie zu weiteren
                        Fragen zum Thema Datenschutz k&ouml;nnen Sie sich jederzeit an uns wenden.
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">6. Externe Links</h2>
                    <p>
                        Diese Website enth&auml;lt Links zu externen Websites (z.B. Instagram).
                        Auf deren Inhalte haben wir keinen Einfluss. F&uuml;r die Inhalte der
                        verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber
                        verantwortlich.
                    </p>
                </section>
            </div>
        </main>
    );
}
