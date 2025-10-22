const form = document.getElementById("absensiForm");
const tabelBody = document.querySelector("#tabelKehadiran tbody");
const filterTanggal = document.getElementById("filterTanggal");
const resetFilterBtn = document.getElementById("resetFilter");

let dataAnak = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const kelas = document.getElementById("kelas").value.trim();
  const waktu = new Date().toLocaleTimeString("id-ID");
  const tanggal = new Date().toISOString().slice(0, 10); // format yyyy-mm-dd

  if (nama === "" || kelas === "") return;

  const data = {
    nama,
    kelas,
    waktu,
    tanggal
  };

  dataAnak.push(data);
  renderTabel();
  form.reset();
});

// Fungsi render tabel dengan filter tanggal
function renderTabel() {
  const filterValue = filterTanggal.value;
  tabelBody.innerHTML = "";

  // Filter data sesuai tanggal jika ada filter
  const dataFiltered = filterValue
    ? dataAnak.filter(item => item.tanggal === filterValue)
    : dataAnak;

  if (dataFiltered.length === 0) {
    tabelBody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Tidak ada data kehadiran</td></tr>`;
    return;
  }

  dataFiltered.forEach((anak, index) => {
    const row = `<tr>
      <td>${index + 1}</td>
      <td>${anak.nama}</td>
      <td>${anak.kelas}</td>
      <td>${anak.waktu}</td>
      <td>${anak.tanggal}</td>
    </tr>`;
    tabelBody.innerHTML += row;
  });
}

// Event untuk filter tanggal
filterTanggal.addEventListener("change", renderTabel);

// Reset filter
resetFilterBtn.addEventListener("click", () => {
  filterTanggal.value = "";
  renderTabel();
});

// Render awal
renderTabel();
