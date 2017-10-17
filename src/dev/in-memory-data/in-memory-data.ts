import { InMemoryDbService } from 'angular-in-memory-web-api';
export class InMemoryDataService implements InMemoryDataService {
    createDb() {
        const wells = [
            {
                "id": 0,
                "name": "Well 1",
                "age": 4,
                "temperature": 150,
                "shutdowns": 6,
                "location": "Angleton, TX"
            },
            {
                "id": 1,
                "name": "Well 2",
                "age": 7,
                "temperature": 143,
                "shutdowns": 2,
                "location": "Freeport, TX"
            },
            {
                "id": 2,
                "name": "Well 3",
                "age": 5,
                "temperature": 151,
                "shutdowns": 5,
                "location": "Baytown, TX"
            },
            {
                "id": 3,
                "name": "Well 4",
                "age": 1,
                "temperature": 157,
                "shutdowns": 0,
                "location": " Geismar, LA"
            },
            {
                "id": 4,
                "name": "Well 5",
                "age": 8,
                "temperature": 149,
                "shutdowns": 14,
                "location": "Plaquemine, LA"
            },
            {
                "id": 5,
                "name": "Well 6",
                "age": 3,
                "temperature": 144,
                "shutdowns": 6,
                "location": "La Porte, TX"
            },
            {
                "id": 6,
                "name": "Well 7",
                "age": 3,
                "temperature": 144,
                "shutdowns": 6,
                "location": "Beaumont, TX"
            }
        ];
        return {wells};
    }
}