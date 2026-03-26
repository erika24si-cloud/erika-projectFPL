import Header from "./Header";
import Foto from "./Foto";
import Identitas from "./Identitas";
import Hobi from "./Hobi";
import Pendidikan from "./Pendidikan";
import Kontak from "./Kontak";

function BiodataDiri() {
  return (
    <div className="container">
      <Header />
      <Foto />
      <Identitas />
      <Hobi />
      <Pendidikan />
      <Kontak />
    </div>
  );
}

export default BiodataDiri;