import {faker} from '@faker-js/faker';

faker.locale='es';

export const generateUser = () => {
    let numProducts = parseInt(faker.random.numeric(1, {bannedDigits: [0]}));
    let products = [];
    for(let i = 0; i < numProducts; i++) {
        products.push(generateProducts());
    }
    return {
        name: faker.name.firstName(),
        lastname: faker.name.lastName(),
        sex: faker.name.sex(),
        birthdate: faker.date.birthdate(),
        phone: faker.phone.number('+54 2616 ### ###'),
        image: faker.internet.avatar(),
        id: faker.database.mongodbObjectId(),
        email: faker.internet.email(),
        products
    }
}

export const generateProducts = () => {
    return {
        title: faker.commerce.productName(),
        price: faker.commerce.price(),
        department: faker.commerce.department(),
        image: faker.image.image(),
        id: faker.database.mongodbObjectId()
    }
}