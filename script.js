// Inisialisasi array untuk menyimpan barang
let cartItems = [];

// Fungsi untuk menambahkan barang ke keranjang
function addItem() {
  const itemName = document.getElementById('itemName').value;
  const itemPrice = parseFloat(document.getElementById('itemPrice').value);
  
  if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
    alert("Nama dan harga barang harus valid.");
    return;
  }

  // Tambahkan barang ke array
  cartItems.push({ name: itemName, price: itemPrice });
  
  // Reset input
  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';

  // Tampilkan barang dan update subtotal
  renderItems();
  updateTotals();
}

// Fungsi untuk menghapus barang dari keranjang
function removeItem(index) {
  cartItems.splice(index, 1); // Hapus barang dari array
  renderItems(); // Render ulang daftar barang
  updateTotals(); // Update total
}

// Fungsi untuk menampilkan barang di daftar
function renderItems() {
  const itemList = document.getElementById('itemList');
  itemList.innerHTML = ''; // Kosongkan daftar sebelumnya

  cartItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name}: Rp ${item.price.toFixed(2)}`;

    // Tombol hapus barang
    const removeButton = document.createElement('button');
    removeButton.textContent = "Hapus";
    removeButton.onclick = () => removeItem(index);

    listItem.appendChild(removeButton);
    itemList.appendChild(listItem);
  });
}

// Fungsi untuk menghitung subtotal, diskon, dan total
function updateTotals() {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  
  // Aturan diskon
  let discount = 0;
  if (subtotal > 2000000) {
    discount = subtotal * 0.15;
  } else if (subtotal > 1000000) {
    discount = subtotal * 0.10;
  }

  // Diskon tambahan untuk lebih dari 5 barang
  if (cartItems.length > 5) {
    discount += subtotal * 0.05;
  }

  const total = subtotal - discount;

  // Update tampilan subtotal, diskon, dan total
  document.getElementById('subtotal').textContent = subtotal.toFixed(2);
  document.getElementById('discount').textContent = discount.toFixed(2);
  document.getElementById('total').textContent = total.toFixed(2);
}
