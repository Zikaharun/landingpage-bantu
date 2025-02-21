document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");
  const heroSection = document.getElementById("hero");

  let workers = []; // Menyimpan data pekerja

  // Ambil data dari JSON eksternal
  fetch("workers.json")
      .then(response => response.json())
      .then(data => {
          workers = data;
      })
      .catch(error => console.error("Error mengambil data:", error));

  // Simpan konten default hero untuk dikembalikan jika pencarian kosong
  const defaultHeroContent = heroSection.innerHTML;

  // Fungsi pencarian pekerja
  searchForm.addEventListener("submit", function(event) {
      event.preventDefault(); // Mencegah reload halaman

      const searchTerm = searchInput.value.trim().toLowerCase(); // Ambil input & ubah ke lowercase

      if (searchTerm === "") {
          heroSection.innerHTML = defaultHeroContent; // Kembalikan tampilan awal jika input kosong
          heroSection.setAttribute("id", "hero");
          return;
      }

      // Filter pekerja berdasarkan input
      const filteredWorkers = workers.filter(worker => worker.job.toLowerCase().includes(searchTerm));

      if (filteredWorkers.length > 0) {
        heroSection.innerHTML = generateWorkerCards(filteredWorkers);
        heroSection.removeAttribute("id"); // Hapus id saat pekerja ditemukan
        heroSection.setAttribute("id", "workerList");
    } else {
        heroSection.innerHTML = `<p class="text-center text-danger fw-bold mt-3">Pekerja tidak ditemukan.</p>`;
        heroSection.removeAttribute("id");
        heroSection.setAttribute("id", "workerList");
    }
  });

  // Fungsi untuk membuat card pekerja dari hasil pencarian
  function generateWorkerCards(workerData) {
      return `
<div class="container">
    <div class="row justify-content-center d-flex flex-wrap">
        ${workerData.map(worker => `
            <div class="col-6 col-md-4 d-flex">
                <div class="card mb-3 shadow flex-fill">
                    <div class="card-body text-dark">
                        <img src="./assets/${worker.img}" alt="bimbel" class="img-fluid rounded shadow border border-2 mb-4" width="500" height="100" loading="lazy">
                        <h5 class="card-title text-sm-start fs-5">${worker.name}</h5>
                        <p class="card-text text-sm-start">Profesi: ${worker.job}</p>
                        <div class="stars">
                        <p class="text-sm-start fs-6">Rp. ${worker.price}</p>
                        <p class="text-sm-start fs-6"><i class="fas fa-star text-warning"></i> 4.9/Reviews</p>
                        </div>
                    </div>
                </div>
            </div>
        `).join("")}
    </div>
</div>

      `;
  }
});

