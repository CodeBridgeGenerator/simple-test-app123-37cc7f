
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
studentId: faker.lorem.sentence(1),
name: faker.lorem.sentence(1),
grade: faker.lorem.sentence(1),
mathGrade: faker.lorem.sentence(1),
scienceGrade: faker.lorem.sentence(1),
englishGrade: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
