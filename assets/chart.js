document.addEventListener('DOMContentLoaded', function() {
    // Menangani klik pada tombol pembelian fisik dan digital
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simpan order ke Snipcart
            Snipcart.api.items.add({
                id: this.getAttribute('data-item-id'),
                name: this.getAttribute('data-item-name'),
                price: this.getAttribute('data-item-price'),
                url: this.getAttribute('data-item-url'),
                description: this.getAttribute('data-item-description'),
                quantity: 1,
                customFields: [{
                    name: "Frame color",
                    value: "Black",
                    options: "Black|Brown|Gold[+300.00]"
                }]
            }).then(function() {
                // Buka checkout setelah menambahkan item
                document.querySelector('.header__checkout').click();
            });
        });
    });

    // Menangani klik pada tombol checkout untuk mengirim pesan ke WhatsApp
    document.querySelector('.header__checkout').addEventListener('click', function() {
        // Dapatkan daftar pesanan dari Snipcart
        Snipcart.api.cart.get().then(cart => {
            let orderList = "Order List:\n";
            cart.items.forEach(item => {
                orderList += `- ${item.name} x${item.quantity} = $${item.price * item.quantity}\n`;
            });
            orderList += `Total: $${cart.total}`;

            // Kirim pesan ke WhatsApp
            const phone = "08562626116";
            const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(orderList)}`;
            window.open(whatsappUrl, '_blank');
        });
    });
});
