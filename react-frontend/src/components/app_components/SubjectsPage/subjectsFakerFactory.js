
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
subjectId: faker.lorem.sentence(1),
subjectName: faker.lorem.sentence(1),
teacherId: faker.lorem.sentence(1),
credits: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
