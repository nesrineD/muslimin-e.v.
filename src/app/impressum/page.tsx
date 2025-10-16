import { NextPage } from "next";

const ImpressumPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Impressum</h1>
      <h2 className="text-2xl font-bold mb-2">Angaben gemäß § 5 TMG</h2>
      <p className="mb-4">
        Muslimin-Beratung e.V.
        <br />
        Musterstraße 123
        <br />
        12345 Musterstadt
      </p>
      <h2 className="text-2xl font-bold mb-2">Vertreten durch:</h2>
      <p className="mb-4">Vorstand: [Namen des Vorstands]</p>
      <h2 className="text-2xl font-bold mb-2">Kontakt</h2>
      <p className="mb-4">
        Telefon: +49 (0) 123 456 789
        <br />
        E-Mail: info@muslimin-beratung.de
      </p>
      <h2 className="text-2xl font-bold mb-2">Registereintrag</h2>
      <p className="mb-4">
        Eintragung im Vereinsregister.
        <br />
        Registergericht: Amtsgericht Musterstadt
        <br />
        Registernummer: VR 12345
      </p>
      <h2 className="text-2xl font-bold mb-2">
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
      </h2>
      <p className="mb-4">[Name und Anschrift des Verantwortlichen]</p>
      <h2 className="text-2xl font-bold mb-2">Haftungsausschluss</h2>
      <p className="mb-4">
        <strong>Haftung für Inhalte</strong>
        <br />
        Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
        jedoch keine Gewähr übernehmen.
      </p>
      <p className="mb-4">
        <strong>Haftung für Links</strong>
        <br />
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen.
      </p>
      <p>
        <strong>Urheberrecht</strong>
        <br />
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht.
      </p>
    </div>
  );
};

export default ImpressumPage;
