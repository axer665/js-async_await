import GameSavingLoader from "../classes/GameSavingLoader";
import read from "../reader";

jest.mock("../reader");

beforeEach(() => {
    jest.resetAllMocks();
});

test("Loading a saved game", (done) => {
    const expected = {
        id: 9,
        created: 1546300800,
        userInfo: {
            id: 1,
            name: "Hitman",
            level: 10,
            points: 2000,
        },
    };
    (async () => {
        const resolveRead = () => {
            const data = "{\"id\":9,\"created\":1546300800,\"userInfo\":{\"id\":1,\"name\":\"Hitman\",\"level\":10,\"points\":2000}}";
            return ((input) => {
                const buffer = new ArrayBuffer(input.length * 2);
                const bufferView = new Uint16Array(buffer);
                for (let i = 0; i < input.length; i += 1) {
                    bufferView[i] = input.charCodeAt(i);
                }
                return buffer;
            })(data);
        };
        read.mockImplementation(() => Promise.resolve(resolveRead()));
        const result = await GameSavingLoader.load();
        expect(result).toEqual(expected);
        done();
    })();
});

test("Error reading a saved game", (done) => {
    (async () => {
        read.mockImplementation(() => Promise.reject(new Error()));
        const result = await GameSavingLoader.load();
        expect(result).toEqual(new Error());
        done();
    })();
});