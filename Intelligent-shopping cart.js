class Product {
    constructor(id, name, price, category, quantity = 0) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.category = category;
        this.quantity = quantity;
    }
}

class ShoppingCart {
    constructor() {
        this.items = [];
        this.appliedCoupon = null;
    }
    
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new Product(
                product.id, 
                product.name, 
                product.price, 
                product.category, 
                quantity
            ));
        }
        
        return this;
    }
    
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        return this;
    }
    
    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = newQuantity;
            }
        }
        
        return this;
    }
    
    getSubtotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
    
    getTotalQuantity() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }
    
    calculateBulkDiscount() {
        const totalQuantity = this.getTotalQuantity();
        const subtotal = this.getSubtotal();
        
        if (totalQuantity >= 5) {
            return subtotal * 0.08; 
        } else if (totalQuantity >= 3) {
            return subtotal * 0.05; 
        }
        
        return 0;
    }
    
    calculateCategoryDiscount() {
        const categories = {};
        
        this.items.forEach(item => {
            if (!categories[item.category]) {
                categories[item.category] = 0;
            }
            categories[item.category] += item.price * item.quantity;
        });
        
        let categoryDiscount = 0;
        
        Object.values(categories).forEach(categoryTotal => {
            if (categoryTotal >= 300) {
                categoryDiscount += categoryTotal * 0.10; 
            } else if (categoryTotal >= 100) {
                categoryDiscount += categoryTotal * 0.05; 
            }
        });
        
        return Math.min(categoryDiscount, this.getSubtotal() * 0.15);
    }
    
    calculateTimeDiscount() {
        const hour = new Date().getHours();
        const subtotal = this.getSubtotal();
        
        if (hour >= 18 && hour < 22) {
            return Math.min(subtotal * 0.05, subtotal * 0.1);
        }
        
        return 0;
    }
    
    validateCoupon(code) {
        const validCoupons = {
            'SAVE10': { discount: 10, type: 'percentage' },
            'SAVE20': { discount: 20, type: 'percentage' },
            'BULK20': { discount: 20, type: 'fixed' },
            'WELCOME5': { discount: 5, type: 'percentage' }
        };
        
        return validCoupons[code.toUpperCase()] || null;
    }
    
    applyCoupon(code) {
        const coupon = this.validateCoupon(code);
        
        if (!coupon) {
            return {
                success: false,
                message: 'Invalid coupon code'
            };
        }
        
        this.appliedCoupon = {
            code: code.toUpperCase(),
            ...coupon
        };
        
        return {
            success: true,
            message: `Coupon "${code}" applied successfully`,
            coupon: this.appliedCoupon
        };
    }
    
    calculateCouponDiscount() {
        if (!this.appliedCoupon) return 0;
        
        const subtotal = this.getSubtotal();
        
        if (this.appliedCoupon.type === 'percentage') {
            return Math.min(
                subtotal * (this.appliedCoupon.discount / 100),
                subtotal
            );
        } else {
            return Math.min(this.appliedCoupon.discount, subtotal);
        }
    }
    
    getDiscountsSummary() {
        const subtotal = this.getSubtotal();
        const bulkDiscount = this.calculateBulkDiscount();
        const categoryDiscount = this.calculateCategoryDiscount();
        const timeDiscount = this.calculateTimeDiscount();
        const couponDiscount = this.calculateCouponDiscount();
        
        const totalDiscount = bulkDiscount + categoryDiscount + timeDiscount + couponDiscount;
        
        return {
            subtotal,
            bulkDiscount,
            categoryDiscount,
            timeDiscount,
            couponDiscount,
            totalDiscount,
            total: Math.max(0, subtotal - totalDiscount)
        };
    }
    
    getCartSummary() {
        return {
            items: this.items,
            itemCount: this.items.length,
            totalQuantity: this.getTotalQuantity(),
            ...this.getDiscountsSummary()
        };
    }
}

const VALID_COUPONS = {
    'SAVE10': { discount: 10, type: 'percentage' },
    'SAVE20': { discount: 20, type: 'percentage' },
    'BULK20': { discount: 20, type: 'fixed' },
    'WELCOME5': { discount: 5, type: 'percentage' }
};


const cart = new ShoppingCart();

const laptop = new Product(1, 'Laptop', 1200, 'electronics');
const mouse = new Product(2, 'Mouse', 25, 'electronics');
const tshirt = new Product(3, 'T-Shirt', 20, 'clothing');
const jeans = new Product(4, 'Jeans', 60, 'clothing');
const book = new Product(5, 'Novel Book', 15, 'books');

cart.addItem(laptop, 1)
    .addItem(mouse, 2)
    .addItem(tshirt, 3)
    .addItem(jeans, 2)
    .addItem(book, 4);

console.log('=== Shopping Cart Summary ===');
console.log(cart.getCartSummary());

console.log('\n=== After updating quantities ===');
cart.updateQuantity(1, 2); 
console.log(cart.getCartSummary());

console.log('\n=== After applying coupon ===');
const couponResult = cart.applyCoupon('SAVE10');
console.log(couponResult);
console.log(cart.getCartSummary());

const hour = new Date().getHours();
console.log(`\nCurrent Hour: ${hour}:00`);
console.log(`Time-based discount active: ${hour >= 18 && hour < 22 ? 'YES (6 PM - 10 PM)' : 'NO'}`);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Product,
        ShoppingCart,
        VALID_COUPONS
    };
}