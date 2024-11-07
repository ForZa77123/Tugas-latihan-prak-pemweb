// Daftar barang awal
let availableItems = [
    { name: "Baju", price: 100000 },
    { name: "Celana", price: 150000 },
    { name: "Sepatu", price: 300000 },
    { name: "Topi", price: 50000 },
  ];
  let selectedItems = [];
  
  // Fungsi untuk menampilkan daftar barang yang tersedia
  function displayAvailableItems() {
    const availableItemsDiv = document.getElementById('availableItems');
    availableItemsDiv.innerHTML = ''; // Kosongkan konten sebelumnya
  
    availableItems.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      
      // Checkbox untuk memilih barang
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `item-${index}`;
      checkbox.value = item.name;
      checkbox.onchange = () => toggleSelectItem(index);
  
      // Label nama barang dan harga
      const label = document.createElement('label');
      label.htmlFor = `item-${index}`;
      label.textContent = `${item.name} - Rp ${item.price.toFixed(2)}`;
  
      // Input untuk jumlah barang
      const quantityInput = document.createElement('input');
      quantityInput.type = 'number';
      quantityInput.min = 1;
      quantityInput.value = 1;
      quantityInput.id = `quantity-${index}`;
      quantityInput.oninput = () => updateQuantity(index, quantityInput.value);
      quantityInput.disabled = true;
  
      itemDiv.appendChild(checkbox);
      itemDiv.appendChild(label);
      itemDiv.appendChild(quantityInput);
      availableItemsDiv.appendChild(itemDiv);
    });
  }
  
  // Fungsi untuk toggle pemilihan barang
  function toggleSelectItem(index) {
    const checkbox = document.getElementById(`item-${index}`);
    const quantityInput = document.getElementById(`quantity-${index}`);
  
    if (checkbox.checked) {
      selectedItems.push({ ...availableItems[index], quantity: 1 });
      quantityInput.disabled = false;
    } else {
      selectedItems = selectedItems.filter(item => item.name !== availableItems[index].name);
      quantityInput.disabled = true;
    }
    updateReceipt();
  }
  
  // Fungsi untuk memperbarui jumlah barang yang dipilih
  function updateQuantity(index, quantity) {
    const selectedItem = selectedItems.find(item => item.name === availableItems[index].name);
    if (selectedItem) {
      selectedItem.quantity = parseInt(quantity);
      updateReceipt();
    }
  }
  
  // Fungsi untuk menambahkan barang baru
  function addNewItem() {
    const name = document.getElementById('newItemName').value.trim();
    const price = parseFloat(document.getElementById('newItemPrice').value);
  
    if (!name || isNaN(price) || price <= 0) {
      alert("Nama dan harga barang harus valid.");
      return;
    }
  
    // Cek apakah barang sudah ada
    if (availableItems.some(item => item.name.toLowerCase() === name.toLowerCase())) {
      alert("Barang dengan nama yang sama sudah ada.");
      return;
    }
  
    // Tambahkan barang ke daftar
    availableItems.push({ name, price });
    document.getElementById('newItemName').value = '';
    document.getElementById('newItemPrice').value = '';
    displayAvailableItems(); // Refresh daftar barang
  }
  
  // Fungsi untuk memperbarui struk belanja
  function updateReceipt() {
    const receiptDiv = document.getElementById('receipt');
    receiptDiv.innerHTML = ''; // Kosongkan struk sebelumnya
  
    let subtotal = 0;
    const receiptList = document.createElement('ul');
  
    selectedItems.forEach(item => {
      const totalItemPrice = item.price * item.quantity;
      subtotal += totalItemPrice;
  
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ${item.quantity} x Rp ${item.price.toFixed(2)} = Rp ${totalItemPrice.toFixed(2)}`;
      receiptList.appendChild(listItem);
    });
  
    receiptDiv.appendChild(receiptList);
  
    // Hitung diskon
    let discount = 0;
    if (subtotal > 2000000) {
      discount = subtotal * 0.15;
    } else if (subtotal > 1000000) {
      discount = subtotal * 0.10;
    }
    if (selectedItems.reduce((sum, item) => sum + item.quantity, 0) > 5) {
      discount += subtotal * 0.05;
    }
  
    const total = subtotal - discount;
  
    // Tampilkan subtotal, diskon, dan total
    const subtotalElement = document.createElement('p');
    subtotalElement.textContent = `Subtotal: Rp ${subtotal.toFixed(2)}`;
    const discountElement = document.createElement('p');
    discountElement.textContent = `Diskon: Rp ${discount.toFixed(2)}`;
    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: Rp ${total.toFixed(2)}`;
  
    receiptDiv.appendChild(subtotalElement);
    receiptDiv.appendChild(discountElement);
    receiptDiv.appendChild(totalElement);
  }
  
  // Inisialisasi tampilan awal
  displayAvailableItems();
  