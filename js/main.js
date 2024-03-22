import { buttonsData, menu } from "./db.js";
import { calculatePrice, elements } from "./helpers.js";
//* Sayfa yüklendiğinde ekrana renderMenuItems fonksiyonunu çalıştır.
document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems(menu);
  renderButtons();
});

elements.buttonsArea.addEventListener("click", searchCategory);
function renderMenuItems(menuItems) {
  /*
          * Dizideki her bir obje için bir elemanı temsil eden
          * HTML elemanı oluştur.
          * Bu HTML'i bir diziye aktar.
      
      */
  let menuHTML = menuItems.map((item) => {
    return `
    <a
    href="productDetail.html?id=${item.id}"
    id="card"
    class="text-decoration-none text-black d-flex flex-column flex-md-row gap-2">
        <img src=${item.img} alt="" class="rounded shadow" />
        <div>
        <div class="d-flex justify-content-between">
            <h5>${item.title}</h5>
            <p class="text-success">${calculatePrice(item.price)} ₺</p>
        </div>
        <p class="lead">
            ${item.desc}
        </p>
        </div>
    </a>
    `;
  });
  // diziyi stringe çevirme
  menuHTML = menuHTML.join("");
  elements.mainArea.innerHTML = menuHTML;
}
function searchCategory(e) {
  const category = e.target.dataset.category;
  //* Tüm dizi elemanlarından yalnızca category değeri butonun category değeri ile eşleşenleri getir.
  const filtredMenu = menu.filter((item) => item.category === category);
  //* Hepsi seçilirse bütün menüyü ekrana basar
  if (category === "all") {
    renderMenuItems(menu);
  } else {
    // Filtrelenmiş elemanları ekrana bas
    renderMenuItems(filtredMenu);
  }
  // Butonları güncelle
  renderButtons(category);
}
//* Ekrana butonları basma
function renderButtons(active) {
  // Eski butonları kaldırma
  elements.buttonsArea.innerHTML = "";
  buttonsData.forEach((btn) => {
    // HTML butonunu oluşturma
    const buttonEle = document.createElement("button");
    // butonElementine classlarını ekleme
    buttonEle.className = "btn btn-outline-dark filter-btn";
    // içerisindeki yazıyı değiştirme
    buttonEle.textContent = btn.text;
    // Hangi kategori olduğu bilgisini buton elementine ekleme
    buttonEle.dataset.category = btn.value;
    // Eğer ki active kategoriyle buton eşleşirse ona farklı class ver
    if (btn.value === active) {
      buttonEle.classList.add("bg-dark", "text-light");
    }
    // HTML'e gönderme
    elements.buttonsArea.appendChild(buttonEle);
  });
}
