import { NextPage } from "next";

const DatenschutzPage: NextPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Datenschutzerklärung</h1>
      <p className="mb-4">
        Verantwortliche Stelle im Sinne der Datenschutzgesetze, insbesondere der
        EU-Datenschutzgrundverordnung (DSGVO), ist:
      </p>
      <p className="mb-4">
        Muslimin-Beratung e.V.
        <br />
        Musterstraße 123
        <br />
        12345 Musterstadt
        <br />
        E-Mail: info@muslimin-beratung.de
      </p>
      <h2 className="text-2xl font-bold mb-2">Ihre Betroffenenrechte</h2>
      <p className="mb-4">
        Unter den angegebenen Kontaktdaten unseres Datenschutzbeauftragten
        können Sie jederzeit folgende Rechte ausüben:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>
          Auskunft über Ihre bei uns gespeicherten Daten und deren Verarbeitung,
        </li>
        <li>Berichtigung unrichtiger personenbezogener Daten,</li>
        <li>Löschung Ihrer bei uns gespeicherten Daten,</li>
        <li>
          Einschränkung der Datenverarbeitung, sofern wir Ihre Daten aufgrund
          gesetzlicher Pflichten noch nicht löschen dürfen,
        </li>
        <li>Widerspruch gegen die Verarbeitung Ihrer Daten bei uns und</li>
        <li>
          Datenübertragbarkeit, sofern Sie in die Datenverarbeitung eingewilligt
          haben oder einen Vertrag mit uns abgeschlossen haben.
        </li>
      </ul>
      <p className="mb-4">
        Sofern Sie uns eine Einwilligung erteilt haben, können Sie diese
        jederzeit mit Wirkung für die Zukunft widerrufen.
      </p>
      <h2 className="text-2xl font-bold mb-2">
        Erfassung allgemeiner Informationen beim Besuch unserer Website
      </h2>
      <p className="mb-4">
        Wenn Sie auf unsere Website zugreifen, werden automatisch mittels eines
        Cookies Informationen allgemeiner Natur erfasst. Diese Informationen
        (Server-Logfiles) beinhalten etwa die Art des Webbrowsers, das
        verwendete Betriebssystem, den Domainnamen Ihres
        Internet-Service-Providers und ähnliches.
      </p>
      <h2 className="text-2xl font-bold mb-2">SSL-Verschlüsselung</h2>
      <p className="mb-4">
        Um die Sicherheit Ihrer Daten bei der Übertragung zu schützen, verwenden
        wir dem aktuellen Stand der Technik entsprechende
        Verschlüsselungsverfahren (z. B. SSL) über HTTPS.
      </p>
    </div>
  );
};

export default DatenschutzPage;
