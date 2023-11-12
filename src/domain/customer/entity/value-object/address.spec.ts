import Address from "./address"

describe('Address unit test', () => {

    it('should throw error when street is empty', () => {
        expect(() => {
            new Address('', 1, '2', 'SP')
        }).toThrowError('Street is required')
    })

    it('should throw error when number is empty', () => {
        expect(() => {
            new Address('dsa', 0, '2', 'SP')
        }).toThrowError('Number is required')
    })

    it('should throw error when number is empty', () => {
        expect(() => {
            new Address('dsa', -1, '2', 'SP')
        }).toThrowError('Number must than zero')
    })

    it('should throw error when zip is empty', () => {
        expect(() => {
            new Address('dsa', 12, '', 'SP')
        }).toThrowError('Zip is required')
    })

    it('should throw error when city is empty', () => {
        expect(() => {
            new Address('dsa', 10, '2', '')
        }).toThrowError('City is required')
    })

    it('should return toString address', () => {
        const address = new Address('street', 10, '20', 'SP')
        expect(address.toString()).toBe('street, 10, 20 SP')
    })

})