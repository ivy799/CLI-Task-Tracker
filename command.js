import { Command } from "commander";
import fs from "fs"
import { json } from "stream/consumers";

const program = new Command();
const dataPath = "task.json"

const addData = (args) => {
    fs.writeFileSync(dataPath, JSON.stringify(args))
}

const readData = () => {
    if (!fs.existsSync(dataPath)) {
        return [];
    }
    const raw = fs.readFileSync(dataPath, "utf-8")
    if (!raw.trim()) {
        return [];
    }
    return JSON.parse(raw)
}

program
    .command("add")
    .argument("<task>", "Your task")
    .action((task) => {
        let newId = 0;
        const data = readData()
        const dataSize = data.length;
        if (dataSize == 0) {
            newId = 0
        } else {
            const lastData = data[data.length - 1]
            newId = lastData.id + 1
        }

        data.push({ id: newId, task, done: false })
        addData(data)
    });

program.parse();
