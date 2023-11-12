import Product from "./product"

describe('Product unit test', () => {

    it('Should throw error when id is empty', () => {
        expect(() => {
            new Product('', 'produto1', 12);
        }).toThrowError('Id is required')
    });

    it('should throw error when name is empty', () => {
        expect(() => {
            new Product('id', '', 14)
        }).toThrowError('Name is required')
    })

    it('should throw error when price is less than zero', () => {
        expect(() => {
            new Product('id', 'name', -1)
        }).toThrowError('Price must be greater than zero')
    })

    it('should change name', () => {
        const product = new Product('1', 'Product 1', 15)
        product.changeName('Product 2')
        expect(product.name).toBe('Product 2')

        expect(() => {
            product.changeName('')
        }).toThrowError('Name is required')
    })

    it('should change price', () => {
        const product = new Product('1', 'Product 1', 15)
        product.changePrice(20)
        expect(product.price).toBe(20)

        expect(() => {
            product.changePrice(-1)
        }).toThrowError('Price must be greater than zero')
    })

})