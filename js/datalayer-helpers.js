// js/datalayer-helpers.js
// Fonctions simplifiées pour le Data Layer GA4

// Ajouter au panier
function trackAddToCart(productName, productPrice, productId = '') {
    window.dataLayer = window.dataLayer || [];
    const itemId = productId || productName.toLowerCase().replace(/ /g, '-');
    
    window.dataLayer.push({
        'event': 'add_to_cart',
        'currency': 'EUR',
        'value': productPrice,
        'ecommerce': {
            'items': [{
                'item_id': itemId,
                'item_name': productName,
                'item_category': 'formations',
                'price': productPrice,
                'quantity': 1
            }]
        }
    });
    
    // Message de confirmation
    alert('Formation "' + productName + '" ajoutée au panier !');
}

// Commencer le checkout
function trackBeginCheckout(productName, productPrice, productId = '') {
    window.dataLayer = window.dataLayer || [];
    const itemId = productId || productName.toLowerCase().replace(/ /g, '-');
    
    window.dataLayer.push({
        'event': 'begin_checkout',
        'currency': 'EUR',
        'value': productPrice,
        'ecommerce': {
            'items': [{
                'item_id': itemId,
                'item_name': productName,
                'item_category': 'formations',
                'price': productPrice,
                'quantity': 1
            }]
        }
    });
}

// Voir le produit
function trackViewProduct(productName, productPrice, productId = '') {
    window.dataLayer = window.dataLayer || [];
    const itemId = productId || productName.toLowerCase().replace(/ /g, '-');
    
    window.dataLayer.push({
        'event': 'view_item',
        'currency': 'EUR',
        'value': productPrice,
        'ecommerce': {
            'items': [{
                'item_id': itemId,
                'item_name': productName,
                'item_category': 'formations',
                'price': productPrice,
                'quantity': 1
            }]
        }
    });
}
