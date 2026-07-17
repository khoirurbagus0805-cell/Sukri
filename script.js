let produk = "";
let harga = 0;
let foto = "";
let keranjang = [];
// memilih produk
function pilihProduk(nama,hargaProduk,gambar,rasaProduk){
produk = nama;
harga = hargaProduk;
foto = gambar;
document.getElementById("namaProduk").innerHTML = nama;
document.getElementById("fotoPesanan").src = gambar;
// otomatis pilih rasa
document.getElementById("rasa").value = rasaProduk;
hitungTotal();
document.querySelector(".checkout")
.scrollIntoView({
behavior:"smooth"
});
}
hitungTotal();
// ketika jumlah berubah
document.getElementById("jumlah")
.addEventListener("input",hitungTotal);
// hitung total pesanan
function hitungTotal(){
let jumlah =
parseInt(document.getElementById("jumlah").value);
let total = harga * jumlah;
document.getElementById("total").innerHTML =
"Total : Rp " + total.toLocaleString();
}
// masuk keranjang
function masukKeranjang(){
let rasa =
document.getElementById("rasa").value;
let jumlah =
parseInt(document.getElementById("jumlah").value);
keranjang.push({
produk:produk,
foto:foto,
rasa:rasa,
jumlah:jumlah,
harga:harga * jumlah
});
tampilkanKeranjang();
}
function tampilkanKeranjang(){
let isi="";
let totalSemua=0;
keranjang.forEach((item,index)=>{
isi += `
<div class="item">
<img src="${item.foto}" width="80">
<br>
<b>${item.produk}</b>
<br>
Rasa : ${item.rasa}
<br>
Jumlah : ${item.jumlah}
<br>
Harga :
Rp${item.harga.toLocaleString()}
<br>
<button onclick="hapus(${index})">
Hapus
</button>
</div>
`;
totalSemua += item.harga;
});
if(keranjang.length==0){
isi="Keranjang kosong";
}
document.getElementById("listCart").innerHTML=isi;
document.getElementById("totalCart").innerHTML=
"Total Belanja : Rp " + totalSemua.toLocaleString();
document.getElementById("jumlahCart").innerHTML=
keranjang.length;
}
function hapus(index){
keranjang.splice(index,1);
tampilkanKeranjang();
}
// checkout whatsapp
 function checkoutWA(){
    // Cek keranjang
    if(keranjang.length == 0){
        alert("Keranjang masih kosong!");
        return;
    }
    // Ambil data pembeli
    let nama = document.getElementById("nama").value.trim();
    let nohp = document.getElementById("nohp").value.trim();
    let alamat = document.getElementById("alamat").value.trim();
    // Validasi data pembeli
    if(nama === "" || nohp === "" || alamat === ""){
        alert("Silakan lengkapi Nama, Nomor HP, dan Alamat terlebih dahulu.");
        return;
    }
    let total = 0;
    // Membuat pesan
    let pesan = " *PESANAN BARU*\n\n";
    pesan += "Halo Admin SnackStore,\n";
    pesan += "Saya ingin memesan produk berikut:\n\n";
    pesan += "━━━━━━━━━━━━━━━━━━━━━━\n";
    pesan += " DATA PEMBELI\n";
    pesan += "━━━━━━━━━━━━━━━━━━━━━━\n";
    pesan += "Nama    : " + nama + "\n";
    pesan += "No. HP  : " + nohp + "\n";
    pesan += "Alamat  : " + alamat + "\n\n";
    pesan += "━━━━━━━━━━━━━━━━━━━━━━\n";
    pesan += " DETAIL PESANAN\n";
    pesan += "━━━━━━━━━━━━━━━━━━━━━━\n";
    keranjang.forEach((item,index)=>{
        pesan +=
`Produk ${index+1}
Nama    : ${item.produk}
Rasa    : ${item.rasa}
Jumlah  : ${item.jumlah}
Harga   : Rp${item.harga.toLocaleString()}
`;
        total += item.harga;
    });
    pesan += "━━━━━━━━━━━━━━━━━━━━━━\n";
    pesan += " Total Belanja : Rp" + total.toLocaleString();
    // Nomor WhatsApp Admin
    let nomor = "62895360282017";
    // Buka WhatsApp
    window.open(
        "https://wa.me/" + nomor + "?text=" + encodeURIComponent(pesan),
        "_blank"
    );

}