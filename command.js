import { Command } from "commander";
import fs from "fs"

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

const updateData = (id, newTask) => {
    const getallData = readData()
    const index = getallData.findIndex(item => item.id == id);
    if (index !== -1) {
        const now = new Date();
        getallData[index].description = newTask;
        getallData[index].updatedAt = now.toLocaleString();
        addData(getallData);
    }
}

const deleteData = (id) => {
    const allData = readData()
    const numericId = parseInt(id, 10);
    const index = allData.findIndex(item => item.id == numericId);
    if (index !== -1) {
        allData.splice(index, 1)
        addData(allData)
    }
}

const markInProgress = (id) => {
    const getallData = readData()
    const index = getallData.findIndex(item => item.id == id);
    if (index !== -1) {
        getallData[index].status = "in-progress";
        addData(getallData);
    }
}

const markDone = (id) => {
    const getallData = readData()
    const index = getallData.findIndex(item => item.id == id);
    if (index !== -1) {
        getallData[index].status = "done";
        addData(getallData);
    }
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
        const now = new Date()
        data.push({ id: newId, description: task, status: "todo", createdAt: now.toLocaleString(), updatedAt: now.toLocaleString() })
        addData(data)
    });

program
    .command("list [status]")
    .action((status) => {
        const data = readData()
        if (!status) {
            console.log(data)
        } else {
            const filtered = data.filter(
                (task) => (task.status || "todo") === status.toLowerCase()
            );

            if (filtered.length === 0) {
                console.log(`Tidak ada task dengan status "${status}"`);
                return;
            }

            filtered.forEach((task) => {
                console.log(`[${task.id}] ${task.description} - ${task.status}`);
            });
        }

    });

program
    .command("update")
    .argument("<id>", "your id")
    .argument("<task>", "Your task")
    .action((id, task) => {
        updateData(id, task)
    });

program
    .command("delete")
    .argument("<id>", "your id")
    .action((id) => {
        deleteData(id)
    });

program
    .command("mark-in-progress")
    .argument("<id>", "your id")
    .action((id) => {
        markInProgress(id)
    });

program
    .command("mark-done")
    .argument("<id>", "your id")
    .action((id) => {
        markDone(id)
    });

program.parse();
