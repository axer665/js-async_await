import read from './../reader';
import toString from './../parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
    static async load() {
        try {
            const binaryData = await read();
            const extractedString = await toString(binaryData);
            const data = JSON.parse(extractedString);
            return new GameSaving(data);
        } catch (e) {
            return e;
        }
    }
}