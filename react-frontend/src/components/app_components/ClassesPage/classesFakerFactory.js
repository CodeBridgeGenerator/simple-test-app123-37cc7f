
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
classId: faker.lorem.sentence(1),
className: faker.lorem.sentence(1),
roomNumber: faker.lorem.sentence(1),
teacherId: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
