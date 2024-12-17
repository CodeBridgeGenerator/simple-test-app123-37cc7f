
import { faker } from "@faker-js/faker";
export default (user,count,studentIDIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.name.fullName(),
age: faker.datatype.number(),
dateofbirth: faker.date.past(""),
studentID: studentIDIds[i % studentIDIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
