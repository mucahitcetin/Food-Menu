import { menu } from "./db.js";
import { calculatePrice } from "./helpers.js";
//* HTML'de arayüzü göndereceğimiz yer
const outlet = document.getElementById("outlet");

// console.log(window.location.search);
/*
 * URL'deki parametreleri yönetebilmek için URLSearchParams class'ından örnek oluşturduk.
 * Örneği oluştururken kendi URL'mizde ki parametreleri gönderdik.
 */
const searchParams = new URLSearchParams(window.location.search);
//* get metodu ile URL'de ki parametresine eriştik
const paramId = searchParams.get("id");
console.log(paramId);
//* Menu içerisinden id'sini bildiğimiz elemana ulaşma
const product = menu.find((item) => item.id === Number(paramId));
//* Bulduğumuz ürüne göre arayüzü ekrana basma
outlet.innerHTML = `
    <div class="d-flex justify-content-between align-items-center">
        <a href="/" class="fs-1"><i class="bi bi-house"></i></a>
        <div>anasayfa / ${
          product.category
        } / ${product.title.toLowerCase()}</div>
        </div>
        <h1 class="text-center shadow rounded p-2 my-3">${product.title}</h1>
        <div class="d-flex align-items-center justify-content-center">
            <img
            src="${product.img}"
            style="max-width: 500px"
            class="img-fluid rounded shadow"
            alt=""
        />
        </div>
    <div>
<h3 class="my-5">
  Ürünün Kategorisi: <span class="text-success">${product.category}</span>
</h3>
<h3 class="my-5">
  Ürünün Fİyatı: <span class="text-success">${calculatePrice(
    product.price
  )} ₺</span>
</h3>
</div>
<p class="lead fs-3">
${product.desc}
</p>
`;
