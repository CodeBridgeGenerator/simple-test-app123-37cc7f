
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
teacherId: faker.lorem.sentence(1),
name: faker.lorem.sentence(1),
department: faker.lorem.sentence(1),
yearsOfExperience: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
