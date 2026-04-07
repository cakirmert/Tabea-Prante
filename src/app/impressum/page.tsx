import Link from "next/link";

export const metadata = {
    title: "Impressum - Tabea Prante",
};

export default function ImpressumPage() {
    return (
        <main className="mx-auto max-w-2xl px-6 py-24 text-zinc-800">
            <Link href="/" className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 hover:text-zinc-700 transition-colors">
                &larr; Back
            </Link>

            <h1 className="mt-10 text-3xl font-light">Impressum</h1>

            <div className="mt-10 space-y-6 text-sm leading-relaxed text-zinc-600">
                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Angaben gem. &sect; 5 TMG</h2>
                    <p>
                        Tabea Prante<br />
                        [Adresse auf Anfrage]<br />
                        Berlin, Deutschland
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Kontakt</h2>
                    <p>
                        E-Mail: <a href="mailto:tabea.prante@gmail.com" className="underline">tabea.prante@gmail.com</a>
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Verantwortlich f&uuml;r den Inhalt gem. &sect; 55 Abs. 2 RSt</h2>
                    <p>
                        Tabea Prante<br />
                        [Adresse auf Anfrage]<br />
                        Berlin, Deutschland
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Haftungsausschluss</h2>
                    <p>
                        Die Inhalte dieser Seiten wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt.
                        F&uuml;r die Richtigkeit, Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte
                        kann jedoch keine Gew&auml;hr &uuml;bernommen werden. Als Diensteanbieter
                        sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen
                        Seiten nach den allgemeinen Gesetzen verantwortlich.
                    </p>
                </section>

                <section>
                    <h2 className="text-xs uppercase tracking-widest text-zinc-400 mb-2">Urheberrecht</h2>
                    <p>
                        Die durch den Seitenbetreiber erstellten Inhalte und Werke auf diesen
                        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung,
                        Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der
                        Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des
                        jeweiligen Autors bzw. Erstellers.
                    </p>
                </section>
            </div>
        </main>
    );
}
